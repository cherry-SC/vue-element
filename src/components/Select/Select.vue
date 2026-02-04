<template>
  <div
    class="sc-select"
    :class="{
      'is-disabled': disabled,
    }"
    @click="toggleDropdown"
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
  >
    <Tooltip
      placement="bottom-start"
      manual
      ref="tooltipRef"
      :popperOptions="popperOption"
      @click-outside="controlDropdown(false)"
    >
      <Input
        ref="inputRef"
        v-model="states.inputValue"
        :disabled="disabled"
        :placeholder="filteredPlaceholder"
        :readonly="!filterable || !isDropdownShow"
        @input="debounceFilter"
        @keydown="handleKeydown"
      >
        <template #suffix>
          <Icon
            icon="circle-xmark"
            v-if="showClearIcon"
            class="sc-input__clear"
            @click.stop="onClear"
            @mousedown.prevent="NOOP"
          />
          <Icon
            v-else
            icon="angle-down"
            class="header-angle"
            :class="{ 'is-active': isDropdownShow }"
          />
        </template>
      </Input>
      <template #content>
        <div class="sc-select__loading" v-if="states.loading">
          <Icon icon="spinner" spin></Icon>
        </div>
        <div
          class="sc-select__nodata"
          v-else-if="filterable && filterOptions.length === 0"
        >
          no matching data
        </div>
        <ul class="sc-select__menu" v-else>
          <template v-for="(item, index) in filterOptions" :key="index">
            <li
              class="sc-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
                'is-highlighted': states.highlightIndex === index,
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <RenderVnode
                :vNode="renderLabel ? renderLabel(item) : item.label"
              ></RenderVnode>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ScSelect",
});
</script>

<script setup lang="ts">
import type {
  SelectProps,
  SelectEmits,
  SelectOption,
  SelectStates,
} from "./types";
import Tooltip from "../Tooltip/Tooltip.vue";
import type { TooltipInstance } from "../Tooltip/types";
import Input from "../Input/Input.vue";
import { ref, reactive, computed, watch } from "vue";
import type { Ref } from "vue";
import type { InputInstance } from "../Input/types";
import Icon from "../Icon/Icon.vue";
import RenderVnode from "../Common/RenderVnode";
import { isFunction, debounce } from "lodash-es";

const NOOP = () => {};

const findOption = (value: string) => {
  const option = props.options.find((option) => option.value === value);
  return option ? option : null;
};

const inputRef = ref() as Ref<InputInstance>;
const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
});
const timeout = computed(() => (props.remote ? 300 : 0));
const emits = defineEmits<SelectEmits>();
const initialOption = findOption(props.modelValue);
watch(
  () => props.modelValue,
  (newValue) => {
    const option = findOption(newValue);
    states.selectedOption = option;
    states.inputValue = option ? option.label : "";
  }
);
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : "",
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightIndex: -1,
});
const tooltipRef = ref() as Ref<TooltipInstance>;
const isDropdownShow = ref(false);
const popperOption: any = {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 9],
      },
    },
    {
      name: "sameWith",
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: "beforeWrite",
      requires: ["computeStyles"],
    },
  ],
};
const filterOptions = ref(props.options);
watch(
  () => props.options,
  (newOptions) => {
    filterOptions.value = newOptions;
  }
);
const generaterFilterOptions = async (searchValue: string) => {
  if (!props.filterable) return;
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filterOptions.value = props.filterMethod(searchValue);
  } else if (
    props.remote &&
    props.remoteMethod &&
    isFunction(props.remoteMethod)
  ) {
    states.loading = true;
    try {
      filterOptions.value = await props.remoteMethod(searchValue);
    } catch (e) {
      console.log(e);
      filterOptions.value = [];
    } finally {
      states.loading = false;
    }
  } else {
    filterOptions.value = props.options.filter((Option) =>
      Option.label.includes(searchValue)
    );
  }
  states.highlightIndex = -1;
};
const onFilter = () => {
  generaterFilterOptions(states.inputValue);
};

const debounceFilter = debounce(() => {
  onFilter();
}, timeout.value);
const filteredPlaceholder = computed(() => {
  if (props.filterable && states.selectedOption && isDropdownShow.value) {
    return states.selectedOption.label;
  }
  return props.placeholder;
});
const controlDropdown = (show: boolean) => {
  if (show) {
    if (props.filterable && states.selectedOption) {
      states.inputValue = "";
    }
    if (props.filterable) {
      generaterFilterOptions(states.inputValue);
    }
    tooltipRef.value?.show();
  } else {
    tooltipRef.value?.hide();
    if (props.filterable) {
      states.inputValue = states.selectedOption
        ? states.selectedOption.label
        : "";
    }
    states.highlightIndex = -1;
  }
  isDropdownShow.value = show;
  emits("visible-change", show);
};
const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case "Enter":
      if (!isDropdownShow.value) {
        controlDropdown(true);
      } else {
        if (
          states.highlightIndex > -1 &&
          filterOptions.value[states.highlightIndex]
        ) {
          itemSelect(filterOptions.value[states.highlightIndex]!);
        } else {
          controlDropdown(false);
        }
      }
      break;
    case "Escape":
      if (isDropdownShow.value) {
        controlDropdown(false);
      }
      break;
    case "ArrowUp":
      e.preventDefault();
      if (filterOptions.value.length > 0) {
        if (states.highlightIndex === -1 || states.highlightIndex === 0) {
          states.highlightIndex = filterOptions.value.length - 1;
        } else {
          states.highlightIndex--;
        }
      }
      break;
    case "ArrowDown":
      e.preventDefault();
      if (filterOptions.value.length > 0) {
        if (
          states.highlightIndex === -1 ||
          states.highlightIndex === filterOptions.value.length - 1
        ) {
          states.highlightIndex = 0;
        } else {
          states.highlightIndex++;
        }
      }
      break;
    default:
      break;
  }
};
const showClearIcon = computed(
  () =>
    props.clearable &&
    states.inputValue.trim() !== "" &&
    states.mouseHover &&
    states.selectedOption
);
const toggleDropdown = () => {
  if (props.disabled) {
    return;
  }
  if (isDropdownShow.value) {
    controlDropdown(false);
  } else {
    controlDropdown(true);
  }
};
const itemSelect = (e: SelectOption) => {
  if (e.disabled) return;
  states.inputValue = e.label;
  states.selectedOption = e;
  emits("update:modelValue", e.value);
  emits("change", e.value);
  controlDropdown(false);
  inputRef.value?.ref.focus();
};
const onClear = () => {
  states.inputValue = "";
  states.selectedOption = null;
  emits("clear");
  emits("update:modelValue", "");
  emits("change", "");
  inputRef.value?.ref.focus();
};
</script>

<style>
</style>

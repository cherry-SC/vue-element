<template>
  <div class="sc-dropdown">
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :manual="manual"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <slot></slot>
      <template #content>
        <ul class="sc-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li
              v-if="item.divided"
              role="separator"
              class="divided-placeholder"
            />
            <li
              class="sc-dropdown__item"
              @click="($event) => itemClick(item)"
              :class="{
                'is-disabled': item.disabled,
                'is-divided': item.divided,
              }"
              :id="`dropdown-item-${item.key}`"
            >
              <RenderVnode :v-node="item.label" />
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
  name: "ScDropdown",
});
</script>

<script setup lang="ts">
import type {
  DropdownProps,
  DropdownEmits,
  DropdownInstance,
  MenuOptions,
} from "./types";
import Tooltip from "../Tooltip/Tooltip.vue";
import { ref } from "vue";
import type { Ref } from "vue";
import type { TooltipInstance } from "../Tooltip/types";
import RenderVnode from "../Common/RenderVnode";
const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true,
});
const emits = defineEmits<DropdownEmits>();
const tooltipRef = ref() as Ref<TooltipInstance>;
const visibleChange = (e: boolean) => {
  emits("visible-change", e);
};

const itemClick = (e: MenuOptions) => {
  if (e.disabled) {
    return;
  }
  emits("select", e);
  if (props.hideAfterClick) {
    tooltipRef.value?.hide();
  }
};

defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide(),
});
</script>

<style>
</style>

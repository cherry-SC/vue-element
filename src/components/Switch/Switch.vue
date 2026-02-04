<template>
  <div
    class="sc-switch"
    :class="{
      [`sc-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked,
    }"
    @click="switchValue"
  >
    <input
      ref="inputRef"
      class="sc-switch__input"
      type="checkbox"
      role="switch"
      :name="name"
      :disabled="disabled"
    />
    <div class="sc-switch__core">
      <div class="sc-switch__core-inner">
        <span
          v-if="activeText || inactiveText"
          class="sc-switch__core-inner-text"
        >
        {{ checked ? activeText : inactiveText }}
      </span>
      </div>
      <div class="sc-switch__core-action"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ScSwitch",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import type { SwitchProps, SwitchEmits } from "./types";

const inputRef = ref<HTMLInputElement>();
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
});
const emits = defineEmits<SwitchEmits>();

const innerValue = ref(props.modelValue);
const checked = computed(() => innerValue.value === props.activeValue);
const switchValue = () => {
  if (props.disabled) {
    return;
  }
  const newValue = checked.value ? props.inactiveValue : props.activeValue;
  innerValue.value = newValue;
  emits("update:modelValue", newValue);
  emits("change", newValue);
};

onMounted(() => {
  inputRef.value!.checked = checked.value;
});

watch(
  () => checked.value,
  (newVal) => {
    inputRef.value!.checked = newVal;
  }
);
watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal;
  }
);
</script>

<style>
</style>

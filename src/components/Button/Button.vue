<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ScButton",
});
</script>

<script setup lang="ts">
import type { ButtonProps } from "./types";
import { ref } from "vue";
import Icon from "../Icon/Icon.vue";
withDefaults(defineProps<ButtonProps>(), {
  nativeType: "button",
});
const _ref = ref<HTMLButtonElement>();
defineExpose({
  ref: _ref,
});
</script>

<template>
  <button
    ref="_ref"
    class="sc-button"
    :class="{
      [`sc-button--${type}`]: type,
      [`sc-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <Icon icon="spinner" spin v-if="loading"></Icon>
    <Icon :icon="icon" v-if="icon"></Icon>
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<style scoped>
</style>

<template>
  <div
    class="sc-input"
    :class="{
      [`sc-input--${type}`]: type,
      [`sc-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
       <div v-if="$slots.prepend" class="sc-input__prepend">
        <slot name="prepend"></slot>
       </div>
       <div class="sc-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="sc-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <!-- input -->
        <input
          class="sc-input__inner"
          :disabled="disabled"
          :type="type"
        />
        <!-- suffix slot -->
        <span v-if="$slots.suffix" class="sc-input__suffix">
          <slot name="suffix"></slot>
        </span>
       </div>
       <!-- append slot -->
       <div v-if="$slots.append" class="sc-input__append">
        <slot name="append"></slot>
       </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea class="sc-textarea__wrapper" :disabled="disabled" />
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ScInput",
});
</script>
<script setup lang="ts">
import type { InputProps } from "./types";

withDefaults(defineProps<InputProps>(), {
  type: "text",
});
</script>

<style>
</style>

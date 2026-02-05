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
      'is-focus': isFocus,
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
          ref="inputRef"
          v-bind="attrs"
          class="sc-input__inner"
          :disabled="disabled"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :placeholder="placeholder"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :autofocus="autofocus"
          :form="form"
          v-model="innerValue"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <!-- suffix slot -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="sc-input__suffix"
          @click="keepFocus"
        >
          <slot name="suffix"></slot>
          <Icon
            icon="fa-solid fa-xmark"
            v-if="showClear"
            class="sc-input__clear"
            @click="clear"
            @mousedown.prevent="NOOP"
          />
          <Icon
            icon="eye"
            v-if="showPasswordArea && passwordVisible"
            class="sc-input__password"
            @click="togglePasswordVisible"
          ></Icon>
          <Icon
            icon="eye-slash"
            v-if="showPasswordArea && !passwordVisible"
            class="sc-input__password"
            @click="togglePasswordVisible"
          ></Icon>
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="sc-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        ref="inputRef"
        v-bind="attrs"
        class="sc-textarea__wrapper"
        :disabled="disabled"
        :placeholder="placeholder"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :form="form"
        v-model="innerValue"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ScInput",
  inheritAttrs: false,
});
</script>
<script setup lang="ts">
import type { InputProps, InputEmits } from "./types";
import type { Ref } from "vue";
import { ref, watch, computed, useAttrs, nextTick, inject } from "vue";
import Icon from "../Icon/Icon.vue";
import { formItemContextKey } from "../Form/types";

const NOOP = () => {};
const attrs = useAttrs();
const emits = defineEmits<InputEmits>();
const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  autocomplete: "off",
});

const innerValue = ref(props.modelValue);
const isFocus = ref(false);
const passwordVisible = ref(false);
const inputRef = ref() as Ref<HTMLInputElement>;
// const textareaRef = ref() as Ref<HTMLTextAreaElement>;
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
};
const showClear = computed(
  () =>
    props.clearable &&
    innerValue.value !== "" &&
    !props.disabled &&
    isFocus.value
);
const showPasswordArea = computed(
  () => props.showPassword && !props.disabled && innerValue.value !== ""
);
const keepFocus = async () => {
  await nextTick();
  inputRef.value.focus();
};
const handleInput = () => {
  emits("update:modelValue", innerValue.value);
  emits("input", innerValue.value);
  runValidate("input");
};
const handleChange = () => {
  emits("change", innerValue.value);
  runValidate("change");
};
const handleFocus = (event: FocusEvent) => {
  isFocus.value = true;
  emits("focus", event);
};
const handleBlur = (event: FocusEvent) => {
  isFocus.value = false;
  emits("blur", event);
  runValidate("blur");
};
const clear = () => {
  innerValue.value = "";
  emits("update:modelValue", "");
  emits("clear");
  emits("input", "");
  emits("change", "");
};
watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal;
  }
);
defineExpose({
  ref: inputRef,
});

const formItemContext = inject(formItemContextKey);
const runValidate = (trigger?: string) => {
  const result = formItemContext
    ?.validate(trigger)
    .catch((e) => console.log(e.errors));
  // console.log('result:', result)
};
</script>

<style>
</style>

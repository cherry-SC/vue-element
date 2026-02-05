<template>
  <form class="sc-form">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ScForm",
});
</script>

<script setup lang="ts">
import { provide } from "vue";
import type { ValidateFieldsError } from "async-validator";
import type {
  FormProps,
  FormItemContext,
  FormContext,
  FormValidateFailure,
  FromInstance,
} from "./types";
import { formContextKey } from "./types";

const props = defineProps<FormProps>();

const fileds: FormItemContext[] = [];
const addFiled: FormContext["addFiled"] = (filed: FormItemContext) => {
  fileds.push(filed);
};
const removeFiled: FormContext["removeFiled"] = (filed: FormItemContext) => {
  if (filed.prop) {
    fileds.splice(fileds.indexOf(filed), 1);
  }
};
const resetFileds = (keys: string[] = []) => {
  const filterArr =
    keys.length > 0
      ? fileds.filter((filed) => keys.includes(filed.prop))
      : fileds;
  filterArr.forEach((filed) => filed.resetFiled());
};
const clearValidate = (keys: string[] = []) => {
  const filterArr =
    keys.length > 0
      ? fileds.filter((filed) => keys.includes(filed.prop))
      : fileds;
  filterArr.forEach((filed) => filed.clearValidate());
};
const validate = async () => {
  let validationErrors: ValidateFieldsError = {};
  for (const filed of fileds) {
    try {
      await filed.validate("");
    } catch (e) {
      const error = e as FormValidateFailure;
      validationErrors = {
        ...validationErrors,
        ...error.fields,
      };
    }
  }
  if (Object.keys(validationErrors).length === 0) return true;
  return Promise.reject(validationErrors);
};

provide(formContextKey, {
  ...props,
  addFiled,
  removeFiled,
});
defineExpose<FromInstance>({
  validate,
  resetFileds,
  clearValidate,
});
</script>

<style>
</style>

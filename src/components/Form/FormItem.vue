<template>
  <div
    class="sc-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading,
      'is-required': isRequired,
    }"
  >
    <label class="sc-form-item__label">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="sc-form-item__content">
      <slot :validate="validate"></slot>
      <div
        class="sc-form-item__error-msg"
        v-if="validateStatus.state === 'error'"
      >
        {{ validateStatus.errMsg }}
      </div>
    </div>
    <!-- {{ innerValue }}-{{ itemRule }} -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ScFormItem",
});
</script>

<script setup lang="ts">
import type {
  FormItemProps,
  FormValidateFailure,
  FormItemContext,
  FormItemInstance,
  ValidateStatusProp,
} from "./types";
import { formContextKey, formItemContextKey } from "./types";
import {
  inject,
  computed,
  reactive,
  provide,
  onMounted,
  onUnmounted,
} from "vue";
import { isNil } from "lodash-es";
// import type { RuleItem } from "async-validator";
import Schema from "async-validator";
let initialValue: any = null;
const props = defineProps<FormItemProps>();

const formContext = inject(formContextKey);
const validateStatus: ValidateStatusProp = reactive({
  state: "init",
  errMsg: "",
  loading: false,
});
const innerValue = computed(() => {
  const model = formContext?.model;
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop];
  } else {
    return null;
  }
});
const itemRule = computed(() => {
  const rules = formContext?.rules;
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop];
  } else {
    return [];
  }
});
const isRequired = computed(() => {
  return itemRule.value?.some((rule) => rule.required);
});
const getTriggeredRules = (trigger?: string) => {
  const rules = itemRule.value;
  if (rules) {
    return rules.filter((rule) => {
      if (!rule.trigger || !trigger) return true;
      return rule.trigger && rule.trigger === trigger;
    });
  } else {
    return [];
  }
};
const validate = async (trigger?: string) => {
  const modelName = props.prop;
  const triggeredRules = getTriggeredRules(trigger);
  if (triggeredRules.length === 0) return true;
  if (modelName) {
    const validator = new Schema({
      [modelName]: triggeredRules,
    });
    validateStatus.loading = true;
    return validator
      .validate({ [modelName]: innerValue.value })
      .then(() => {
        validateStatus.state = "success";
      })
      .catch((e: FormValidateFailure) => {
        const { errors } = e;
        validateStatus.state = "error";
        validateStatus.errMsg =
          errors && errors.length > 0 ? errors?.[0]?.message || "" : "";
        return Promise.reject(e);
      })
      .finally(() => {
        validateStatus.loading = false;
      });
  }
};
const clearValidate = () => {
  validateStatus.state = "init";
  validateStatus.errMsg = "";
  validateStatus.loading = false;
};
const resetFiled = () => {
  clearValidate();
  const model = formContext?.model;
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initialValue;
  }
};
const context: FormItemContext = {
  validate,
  prop: props.prop || "",
  resetFiled,
  clearValidate,
};
provide(formItemContextKey, context);

onMounted(() => {
  if (props.prop) {
    formContext?.addFiled(context);
    initialValue = innerValue.value;
  }
});
onUnmounted(() => {
  formContext?.removeFiled(context);
});

defineExpose<FormItemInstance>({
  validateStatus,
  validate,
  resetFiled,
  clearValidate,
});
</script>

<style>
</style>

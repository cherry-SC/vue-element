<template>
  <Transition name="sc-alert-fade">
    <div
      v-if="visible"
      class="sc-alert"
      :class="{
        [`sc-alert--${type}`]: type,
        [`is-${effect}`]: effect,
        'is-with-icon': showIcon,
        'is-closable': closable,
        'is-with-description': hasDescription,
      }"
    >
      <div v-if="showIcon" class="sc-alert__icon">
        <Icon :icon="defaultIcon" size="xl"></Icon>
      </div>
      <div class="sc-alert__content">
        <div class="sc-alert__title">{{ title }}</div>
        <div v-if="hasDescription" class="sc-alert__description">
          <slot name="description">{{ description }}</slot>
        </div>
      </div>
      <button
        v-if="closable"
        type="button"
        class="sc-alert__closebtn"
        aria-label="close"
        @click="handleClose"
      >
        <span v-if="closeText" class="sc-alert__close-text">{{
          closeText
        }}</span>
        <Icon v-else icon="xmark" />
      </button>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ScAlert",
});
</script>

<script setup lang="ts">
import type { AlertProps } from "./types";
import { defineProps } from "vue";
import { ref, computed, useSlots } from "vue";
import Icon from "../Icon/Icon.vue";
// const resolvedIconType = computed(() => props.type as AlertType);
const visible = ref(true);
const props = withDefaults(defineProps<AlertProps>(), {
  type: "info",
  effect: "light",
  closable: false,
  showIcon: false,
});
const emit = defineEmits<{
  (e: "close"): void;
}>();
const slots = useSlots();
// !! 检查 props 中的 description 是否存在，或者 slots 中是否有名为 description 的插槽
// !!的作用是将结果转换为布尔值，两个!叫“双重非”:
// - 第一个 ! ：把值取反，并把它变成布尔语义（truthy/falsey）
// - 第二个 ! ：再取反回来，得到一个真正的 boolean
const hasDescription = computed(
  () => !!props.description || !!slots.description
);
const defaultIcon = computed(() => {
  switch (props.type) {
    case "success":
      return "circle-check";
    case "warning":
      return "triangle-exclamation";
    case "danger":
      return "circle-xmark";
    case "primary":
      return "circle-info";
    case "info":
    default:
      return "circle-info";
  }
});

const handleClose = () => {
  visible.value = false;
  emit("close");
};
</script>

<style>
</style>

<template>
  <Transition
    :name="transitionName"
    @after-leave="destoryComponent"
    @enter="updateHeight"
  >
    <div
      class="sc-message"
      v-show="visible"
      :class="{
        [`sc-message--${type}`]: type,
        'is-close': showClose,
      }"
      role="alert"
      ref="messageRef"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="sc-message__content">
        <Icon class="sc-message__icon" :icon="defaultIcon" />
        <slot>
          <RenderVnode :vNode="message" v-if="message" />
        </slot>
      </div>
      <div class="sc-message__close" v-if="showClose">
        <Icon icon="xmark" @click.stop="visible = false" />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ScMessage",
});
</script>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import RenderVnode from "../Common/RenderVnode";
import Icon from "../Icon/Icon.vue";
import type { MessageProps } from "./types";
import { gtetLastBottomOffset } from "./method";
import useEventListener from "../../hooks/useEventListener";

const props = withDefaults(defineProps<MessageProps>(), {
  type: "info",
  duration: 3000,
  offset: 20,
  transitionName: "fade-up",
});
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
const visible = ref(false);
const messageRef = ref<HTMLElement>();
// 计算当前消息的偏移量
const height = ref(0);
const lastOffset = computed(() => gtetLastBottomOffset(props.id));
const topOffset = computed(() => lastOffset.value + props.offset);
const bottomOffset = computed(() => topOffset.value + height.value);
const cssStyle = computed(() => ({
  top: topOffset.value + "px",
  zIndex: props.zIndex,
}));
let timer: any = null;
function startTimer() {
  if (props.duration === 0) return;
  timer = setTimeout(() => {
    visible.value = false;
  }, props.duration);
}
function clearTimer() {
  clearTimeout(timer);
}
onMounted(async () => {
  visible.value = true;
  startTimer();
  // await nextTick();
  // height.value = messageRef.value!.getBoundingClientRect().height;
});
function keydown(e: Event) {
  const event = e as KeyboardEvent;
  if (event.code === "Escape") {
    visible.value = false;
  }
}
useEventListener(document, "keydown", keydown);
// watch(visible, (newVal) => {
//   if (!newVal) {
//     props.onDestroy();
//   }
// });
function destoryComponent() {
  props.onDestroy();
}
function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height;
}
defineExpose({
  bottomOffset,
  visible,
});
</script>

<style>
/* .sc-message {
  width: max-content;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  border: 1px solid #ccc;
} */
</style>

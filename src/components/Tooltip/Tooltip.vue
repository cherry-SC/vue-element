<template>
  <div class="sc-tooltip" v-on="outerEvents" ref="popperContainerNode">
    <div class="sc-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot></slot>
    </div>
    <Transition :name="transition">
      <div v-if="isOpen" class="sc-tooltip__popper" ref="popperNode">
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ScTooltip",
});
</script>

<script setup lang="ts">
import type { TooltipProps, TooltipEmits, TooltipInstance } from "./types";
import { ref, watch, reactive, onUnmounted, computed } from "vue";
import type { Instance } from "@popperjs/core";
import { createPopper } from "@popperjs/core";
import useClickOutside from "../../hooks/useClickOutside";
import { debounce } from "lodash-es";

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "bottom",
  trigger: "hover",
  transition: "fade",
  openDelay: 0,
  closeDelay: 0,
});

let PopperInstance: null | Instance = null;
const emits = defineEmits<TooltipEmits>();
const isOpen = ref(false);
const popperNode = ref<HTMLElement>();
const triggerNode = ref<HTMLElement>();
const popperContainerNode = ref<HTMLElement>();
let events: Record<string, any> = reactive({});
let outerEvents: Record<string, any> = reactive({});
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 9],
        },
      },
    ],
    ...props.popperOptions,
  };
});

const open = () => {
  isOpen.value = true;
  emits("visible-change", true);
};
const close = () => {
  isOpen.value = false;
  emits("visible-change", false);
};
const openDebounce = debounce(open, props.openDelay);
const closeDebounce = debounce(close, props.closeDelay);

const openFinal = () => {
  closeDebounce.cancel();
  openDebounce();
};
const closeFinal = () => {
  openDebounce.cancel();
  closeDebounce();
};
const togglePopper = () => {
  if (!isOpen.value) {
    openFinal();
  } else {
    closeFinal();
  }
};
const attachEvents = () => {
  if (props.trigger === "hover") {
    events["mouseenter"] = openFinal;
    outerEvents["mouseleave"] = closeFinal;
  } else if (props.trigger === "click") {
    events["click"] = togglePopper;
  }
};
useClickOutside(popperContainerNode, () => {
  if (props.trigger === "click" && isOpen.value && !props.manual) {
    closeFinal();
  }
  if(isOpen.value){
    emits("click-outside", true);
  }
});
if (!props.manual) {
  attachEvents();
}
watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      events = {};
      outerEvents = {};
    } else {
      attachEvents();
    }
  }
);
watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    if (newTrigger !== oldTrigger) {
      events = {};
      outerEvents = {};
      attachEvents();
    }
  }
);
watch(
  isOpen,
  (newVal) => {
    if (newVal) {
      if (popperNode.value && triggerNode.value) {
        PopperInstance = createPopper(
          triggerNode.value,
          popperNode.value,
          popperOptions.value
        );
      } else {
        PopperInstance?.destroy();
      }
    }
  },
  { flush: "post" }
);
onUnmounted(() => {
  PopperInstance?.destroy();
});
defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal,
});
</script>

<style>
/* .sc-tooltip {
  width: 100px;
  height: 100px;
} */
</style>

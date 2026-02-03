import { onMounted, onBeforeUnmount, isRef, watch, unref } from 'vue'
import type { Ref } from 'vue'
export default function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => any
) {
  onMounted(() => {
    if (isRef(target)) {
      watch(target, (newValue, oldValue) => {
        oldValue?.removeEventListener(event, handler)
        newValue?.addEventListener(event, handler)
      })
    } else {
      target.addEventListener(event, handler)
    }
  })
  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler)
  })
}

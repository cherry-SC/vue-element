<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'

defineProps<{
  title?: string
}>()

const slots = useSlots()
const showSource = ref(false)
const hasSource = computed(() => Boolean(slots.source))
</script>

<template>
  <section class="demo-block">
    <header v-if="title" class="demo-block__header">{{ title }}</header>
    <div class="demo-block__demo">
      <slot name="demo" />
    </div>
    <div v-if="hasSource" class="demo-block__op">
      <button class="demo-block__btn" type="button" @click="showSource = !showSource">
        {{ showSource ? "隐藏代码" : "显示代码" }}
      </button>
    </div>
    <div v-if="hasSource && showSource" class="demo-block__source">
      <slot name="source" />
    </div>
  </section>
</template>

<style scoped>
.demo-block {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
  margin: 16px 0;
}

.demo-block__header {
  padding: 10px 14px;
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.demo-block__demo {
  padding: 16px 14px;
  background: var(--vp-c-bg);
}

.demo-block__op {
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.demo-block__btn {
  font-size: 13px;
  line-height: 1;
  padding: 10px 14px;
  border: 0;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.demo-block__btn:hover {
  color: var(--vp-c-brand-1);
}

.demo-block__source {
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  padding: 0 14px 14px;
}

.demo-block__source :deep(pre) {
  margin: 12px 0 0;
}
</style>


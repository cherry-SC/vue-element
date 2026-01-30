<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ScCollapse",
});
</script>

<script setup lang="ts">
import { ref, provide, watch } from "vue";
import type { NameType, CollapseProps, CollapseEmits } from "./types";
import { collapseContextKey } from "./types";

const props = defineProps<CollapseProps>();

const emit = defineEmits<CollapseEmits>();
const activeNames = ref<NameType[]>(props.modelValue || []);
watch(() => props.modelValue, (newValue) => {
  activeNames.value = newValue || [];
});
if (props.accordion && activeNames.value.length > 1) {
  console.log("accordion mode, only one item can be active");
}
const handleItemClick = (item: NameType) => {
  if (props.accordion) {
    activeNames.value = [activeNames.value[0] === item ? "" : item];
  } else {
    const index = activeNames.value.indexOf(item);
    if (index > -1) {
      activeNames.value.splice(index, 1);
    } else {
      activeNames.value.push(item);
    }
    emit("update:modelValue", activeNames.value);
    emit("change", activeNames.value);
  }
};

provide(collapseContextKey, {
  activeNames,
  handleItemClick,
});
</script>

<template>
  <div class="sc-collapse">
    <slot></slot>
  </div>
</template>


<style>
</style>

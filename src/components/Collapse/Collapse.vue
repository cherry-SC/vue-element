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
watch(
  () => props.modelValue,
  (newValue) => {
    activeNames.value = newValue || [];
  }
);
if (props.accordion && activeNames.value.length > 1) {
  console.log("accordion mode, only one item can be active");
}
const handleItemClick = (item: NameType) => {
  let _activeNames = [...activeNames.value];
  if (props.accordion) {
    _activeNames = [_activeNames[0] === item ? "" : item];
    activeNames.value = _activeNames;
  } else {
    const index = _activeNames.indexOf(item);
    if (index > -1) {
      _activeNames.splice(index, 1);
    } else {
      _activeNames.push(item);
    }
    activeNames.value = _activeNames;
  }
  emit("update:modelValue", _activeNames);
  emit("change", _activeNames);
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

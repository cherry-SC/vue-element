<template>
  <i
    class="sc-icon"
    :class="{ [`sc-icon--${type}`]: type }"
    :style="customStyles"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ScIcon",
  inheritAttrs: false,
});
</script>

<script setup lang="ts">
import { omit } from "lodash-es";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { IconProps } from "./types";
import { computed } from "vue";
const props = defineProps<IconProps>();
const filterProps = computed(() => omit(props, ["type", "color"]));
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {};
});
</script>

<style>
</style>

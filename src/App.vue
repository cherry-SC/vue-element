<script setup lang="ts">
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import { ref, onMounted, h } from "vue";
import type { ButtonInstance } from "./components/Button/types";
import Icon from "./components/Icon/Icon.vue";
import Alert from "./components/Alert/Alert.vue";
import Tooltip from "./components/Tooltip/Tooltip.vue";
import Dropdown from "./components/Dropdown/Dropdown.vue";
import type { MenuOptions } from "./components/Dropdown/types";
// import type { Options } from "@popperjs/core";
// import { createPopper } from "@popperjs/core";
// 定义一个 ref 来引用 Button 组件实例
const buttonRef = ref<ButtonInstance | null>(null);
const trigger = ref<any>("hover");
const options: MenuOptions[] = [
  {
    key: "1",
    label: h('b', 'this is bold'),
  },
  {
    key: "2",
    label: "item 2",
    disabled: true,
  },
  {
    key: "3",
    label: "item 3",
    divided: true,
  },
];
// const options: Partial<Options> = {
//   placement: "right-end",
//   strategy: "fixed",
// };
// const overlayNode = ref<HTMLElement>();
// const triggerNode = ref<HTMLElement>();
onMounted(() => {
  console.log(buttonRef.value?.ref);
  const buttonRefElement = buttonRef.value?.ref;
  buttonRefElement?.focus();
  if (buttonRefElement) {
    buttonRefElement.style.backgroundColor = "red";
  }
});
const openValue = ref(["1"]);
</script>

<template>
  <Collapse v-model="openValue" accordion>
    <CollapseItem name="1">
      <template #title>
        <h1>title 1</h1>
      </template>
      <h1>headline title</h1>
      <div>content 1</div>
    </CollapseItem>
    <CollapseItem name="2" title="title 2">
      <div>this is content 2</div>
    </CollapseItem>
    <CollapseItem name="3" title="title 3">
      <div>this is content 3</div>
    </CollapseItem>
  </Collapse>
  <!-- {{ openValue }} -->
  <!-- <h1>hello</h1>
  <Button type="primary" plain ref="buttonRef">test button</Button>
  <hr>
  <a href="https://www.baidu.com">baidu</a> -->
  <Button type="primary">default button</Button>
  <Button type="primary" plain>plain button</Button>
  <Button type="primary" disabled>disabled button</Button>
  <Button type="primary" round>round button</Button>
  <Button type="primary" circle>circle button</Button>
  <hr />
  <Button type="primary">button</Button>
  <Button type="danger">button</Button>
  <Button type="info">button</Button>
  <Button type="warning">button</Button>
  <Button type="success">button</Button>
  <hr />
  <Button type="primary" plain>button</Button>
  <Button type="danger" plain>button</Button>
  <Button type="info" plain>button</Button>
  <Button type="warning" plain>button</Button>
  <Button type="success" plain>button</Button>
  <hr />
  <Button loading>loading</Button>
  <Button icon="fa-solid fa-alarm-clock">test Icon</Button>
  <hr />
  <Icon icon="fa-solid fa-user-secret" color="red" />
  <Icon icon="arrow-up" size="2x" type="danger" />
  <Icon icon="fa-solid fa-address-book" type="info" />
  <hr />
  <Alert
    title="alert title"
    type="info"
    showIcon
    description="alert description"
    closable
  ></Alert>
  <Alert
    title="alert title"
    type="warning"
    showIcon
    description="alert description"
    closable
  ></Alert>
  <Alert
    title="alert title"
    type="success"
    showIcon
    description="alert description"
    closable
  ></Alert>
  <Alert
    title="alert title"
    type="danger"
    showIcon
    description="alert description"
    closable
  ></Alert>
  <Alert
    title="alert title"
    type="primary"
    showIcon
    description="alert description"
    closable
  ></Alert>
  <hr />
  <Alert
    effect="dark"
    title="alert title"
    type="info"
    showIcon
    description="alert description"
    closable
  ></Alert>
  <Alert
    effect="dark"
    title="alert title"
    type="warning"
    showIcon
    description="alert description"
    closable
  ></Alert>
  <Alert
    effect="dark"
    title="alert title"
    type="success"
    showIcon
    description="alert description"
    closable
  ></Alert>
  <Alert
    effect="dark"
    title="alert title"
    type="danger"
    showIcon
    description="alert description"
    closable
  ></Alert>
  <Alert
    effect="dark"
    title="alert title"
    type="primary"
    showIcon
    description="alert description"
    closable
  ></Alert>
  <hr />
  <Tooltip :trigger="trigger" :open-delay="300" :close-delay="300">
    <div class="testTooltipDiv">click me</div>
    <template #content>
      <h1>this is tooltip content</h1>
    </template>
  </Tooltip>
  <hr />
  <Dropdown :menu-options="options" :trigger="trigger">
    <h1>dropdown</h1>
  </Dropdown>
  <hr />
</template>

<style scoped>
.sc-alert {
  margin: 20px 0 0;
}
/* .testTooltipDiv {
  cursor: pointer;
  width: 100px;
  height: 100px;
  background-color: red;
} */
</style>

<script setup lang="ts">
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import CollapseItem from './components/Collapse/CollapseItem.vue'
import {ref,onMounted} from 'vue'
import type { ButtonInstance } from './components/Button/types'
import Icon from './components/Icon/Icon.vue'
// 定义一个 ref 来引用 Button 组件实例
const buttonRef = ref<ButtonInstance | null>(null)
onMounted(() => {
  console.log(buttonRef.value?.ref)
  const buttonRefElement = buttonRef.value?.ref
  buttonRefElement?.focus()
  if (buttonRefElement) {
    buttonRefElement.style.backgroundColor = 'red'
  }
})
const openValue = ref(['1'])

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
  <hr>
  <Button type="primary">button</Button>
  <Button type="danger">button</Button>
  <Button type="info">button</Button>
  <Button type="warning">button</Button>
  <Button type="success">button</Button>
  <hr>
    <Button type="primary" plain>button</Button>
  <Button type="danger" plain>button</Button>
  <Button type="info" plain>button</Button>
  <Button type="warning" plain>button</Button>
  <Button type="success" plain>button</Button>
  <hr>
  <Button loading>loading</Button>
  <Button icon="fa-solid fa-alarm-clock">test Icon</Button>
  <hr>
  <Icon icon="fa-solid fa-user-secret" color="red" />
  <Icon icon="arrow-up" size="2x" type="danger" />
  <Icon icon="fa-solid fa-address-book" type="info" />

</template>

<style scoped>

</style>

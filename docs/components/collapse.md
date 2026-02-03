---
title: Collapse | V-Element
description: Collapse 组件文档
outline: deep
---

<script setup lang="ts">
import { ref } from 'vue'

const openNames = ref<(string | number)[]>(['1'])
const accordionNames = ref<(string | number)[]>(['1'])
</script>

# Collapse 折叠面板

通过面板折叠/展开组织内容区域。

适用于“信息密度较高但只需要分段浏览”的内容，比如 FAQ、表单分组、侧边栏筛选项等。

## 基本用法

使用 `v-model` 绑定展开项的 `name` 列表。每个 `ScCollapseItem` 都建议显式传入唯一的 `name`，用于展开状态的识别。

<DemoBlock title="基本用法（v-model）">
  <template #demo>
    <ScCollapse v-model="openNames">
      <ScCollapseItem name="1" title="标题 1">内容 1</ScCollapseItem>
      <ScCollapseItem name="2" title="标题 2">内容 2</ScCollapseItem>
      <ScCollapseItem name="3" title="禁用项" disabled>内容 3</ScCollapseItem>
    </ScCollapse>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const openNames = ref<(string | number)[]>(['1'])
</script>

<template>
  <ScCollapse v-model="openNames">
    <ScCollapseItem name="1" title="标题 1">内容 1</ScCollapseItem>
    <ScCollapseItem name="2" title="标题 2">内容 2</ScCollapseItem>
    <ScCollapseItem name="3" title="禁用项" disabled>内容 3</ScCollapseItem>
  </ScCollapse>
</template>
```

  </template>
</DemoBlock>

## 手风琴模式

设置 `accordion` 后，同一时间仅允许一个面板处于展开状态。

<DemoBlock title="手风琴模式（accordion）">
  <template #demo>
    <ScCollapse v-model="accordionNames" accordion>
      <ScCollapseItem name="1" title="标题 1">内容 1</ScCollapseItem>
      <ScCollapseItem name="2" title="标题 2">内容 2</ScCollapseItem>
      <ScCollapseItem name="3" title="标题 3">内容 3</ScCollapseItem>
    </ScCollapse>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const accordionNames = ref<(string | number)[]>(['1'])
</script>

<template>
  <ScCollapse v-model="accordionNames" accordion>
    <ScCollapseItem name="1" title="标题 1">内容 1</ScCollapseItem>
    <ScCollapseItem name="2" title="标题 2">内容 2</ScCollapseItem>
    <ScCollapseItem name="3" title="标题 3">内容 3</ScCollapseItem>
  </ScCollapse>
</template>
```

  </template>
</DemoBlock>

## Collapse API

### Collapse Attributes

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | (string \| number)[] | [] | 当前展开项 name 列表 |
| accordion | boolean | false | 手风琴模式（同一时间仅允许一个面板展开） |

### Collapse Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 展开项变化（v-model 更新） | (string \| number)[] |
| change | 展开项变化 | (string \| number)[] |

## CollapseItem API

### CollapseItem Attributes

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| name | string \| number | - | 唯一标识（建议必填） |
| title | string | - | 标题 |
| disabled | boolean | false | 禁用当前面板 |

### CollapseItem Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 面板内容 |
| title | 自定义标题区域 |

---
title: Icon | V-Element
description: Icon 组件文档
outline: deep
---

# Icon 图标

基于 Font Awesome 的图标组件。

Icon 组件的核心目标是把图标的“选择 + 尺寸 + 颜色/主题”统一成一致的用法，便于在 Button、Alert、Message 等组件里复用。

## 使用前准备

Icon 基于 Font Awesome 渲染。如果在你的业务项目中直接使用该组件，请确保已在应用入口初始化图标库（示例仅演示全量引入 solid 图标集）：

```ts
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)
```

## 基础用法

通过 `icon` 指定图标名；可选用 `type` 套用主题色，或用 `color` 传入自定义颜色。

<DemoBlock title="基础用法">
  <template #demo>
    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
      <ScIcon icon="arrow-up" />
      <ScIcon icon="spinner" spin />
      <ScIcon icon="circle-check" type="success" />
      <ScIcon icon="triangle-exclamation" type="warning" />
      <ScIcon icon="circle-xmark" type="danger" />
      <ScIcon icon="circle-info" type="info" />
    </div>
  </template>

  <template #source>

```vue
<template>
  <ScIcon icon="arrow-up" />
  <ScIcon icon="spinner" spin />
  <ScIcon icon="circle-check" type="success" />
  <ScIcon icon="triangle-exclamation" type="warning" />
  <ScIcon icon="circle-xmark" type="danger" />
  <ScIcon icon="circle-info" type="info" />
</template>
```

  </template>
</DemoBlock>

## Icon API

### Icon Attributes

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| icon | string \| string[] \| object | - | 图标定义（必填） |
| size | string | - | 尺寸（Font Awesome size） |
| spin | boolean | false | 旋转动画 |
| type | "primary" \| "success" \| "warning" \| "danger" \| "info" | - | 主题类型（用于 class） |
| color | string | - | 颜色（用于 style） |

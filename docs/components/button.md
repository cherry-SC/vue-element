---
title: Button | V-Element
description: Button组件的文档
outline: deep
---

# Button 按钮
常用的操作按钮，用于触发即时操作（提交、确认、跳转、打开弹窗等）。

在一个页面里，按钮往往承担“引导用户下一步”的职责。建议优先明确主次：一个区域内尽量只有一个主操作按钮，其余用次要样式表达层级差异。

## 使用场景

- 表单提交、确认/取消等明确动作
- 列表/卡片中的行内操作
- 作为 Tooltip / Dropdown 等组件的触发器

## 基础用法
使用 `type` 定义按钮的语义与主题色，配合 `plain` / `round` / `circle` 调整外观形态。

### 按钮类型

<DemoBlock title="基础用法">
  <template #demo>
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <ScButton>默认</ScButton>
      <ScButton type="primary">Primary</ScButton>
      <ScButton type="success">Success</ScButton>
      <ScButton type="warning">Warning</ScButton>
      <ScButton type="danger">Danger</ScButton>
      <ScButton type="info">Info</ScButton>
    </div>
  </template>

  <template #source>

```vue
<template>
  <ScButton>默认</ScButton>
  <ScButton type="primary">Primary</ScButton>
  <ScButton type="success">Success</ScButton>
  <ScButton type="warning">Warning</ScButton>
  <ScButton type="danger">Danger</ScButton>
  <ScButton type="info">Info</ScButton>
</template>
```

  </template>
</DemoBlock>

### 形态与状态

<DemoBlock title="朴素 / 圆角 / 圆形">
  <template #demo>
    <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
      <ScButton type="primary" plain>朴素</ScButton>
      <ScButton type="primary" round>圆角</ScButton>
      <ScButton type="primary" circle icon="arrow-up" />
      <ScButton type="primary" disabled>禁用</ScButton>
      <ScButton type="primary" loading>加载中</ScButton>
      <ScButton type="primary" icon="arrow-right">图标</ScButton>
    </div>
  </template>

  <template #source>

```vue
<template>
  <ScButton type="primary" plain>朴素</ScButton>
  <ScButton type="primary" round>圆角</ScButton>
  <ScButton type="primary" circle icon="arrow-up" />
  <ScButton type="primary" disabled>禁用</ScButton>
  <ScButton type="primary" loading>加载中</ScButton>
  <ScButton type="primary" icon="arrow-right">图标</ScButton>
</template>
```

  </template>
</DemoBlock>

## 设计建议

- 主按钮用于最关键的操作；同一区域尽量只有一个 `type="primary"`
- 异步操作中建议用 `loading` 替代手动禁用，避免重复点击
- 纯图标按钮建议配合 Tooltip 补充可读性（尤其在图标含义不够直观时）

## Button API

### Button Attributes

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | "primary" \| "danger" \| "info" \| "success" \| "warning" | - | 按钮类型 |
| size | "large" \| "small" \| "medium" | - | 按钮尺寸 |
| plain | boolean | false | 朴素按钮 |
| round | boolean | false | 圆角按钮 |
| circle | boolean | false | 圆形按钮 |
| disabled | boolean | false | 禁用 |
| nativeType | "button" \| "submit" \| "reset" | "button" | 原生 type |
| autofocus | boolean | false | 自动聚焦 |
| icon | string | - | Font Awesome 图标名 |
| loading | boolean | false | 加载中 |

### Button Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 按钮内容 |

### Button Exposes

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| ref | HTMLButtonElement | 组件内部的 button 元素引用 |

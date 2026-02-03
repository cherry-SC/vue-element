---
title: Alert | V-Element
description: Alert 组件文档
outline: deep
---

# Alert 警告

用于页面中展示重要的提示信息，强调“需要用户注意”的状态变化或风险提示。

和 Message 不同，Alert 更偏向页面内的“常驻提示”，通常放在表单顶部、列表页说明区或模块标题下方。

## 使用场景

- 表单校验或提交失败后的错误提示
- 功能/模块的规则说明、风险提醒
- 列表为空时的引导文案或说明

## 基础用法

通过 `type` 表达语义（success / info / warning / danger 等），可选展示图标与关闭按钮。

### 不同类型

<DemoBlock title="基础用法">
  <template #demo>
    <div style="display: grid; gap: 12px;">
      <ScAlert title="Success alert" type="success" showIcon closable />
      <ScAlert title="Info alert" type="info" showIcon closable />
      <ScAlert title="Warning alert" type="warning" showIcon closable />
      <ScAlert title="Danger alert" type="danger" showIcon closable />
    </div>
  </template>

  <template #source>

```vue
<template>
  <ScAlert title="Success alert" type="success" showIcon closable />
  <ScAlert title="Info alert" type="info" showIcon closable />
  <ScAlert title="Warning alert" type="warning" showIcon closable />
  <ScAlert title="Danger alert" type="danger" showIcon closable />
</template>
```

  </template>
</DemoBlock>

### 深色主题与描述

<DemoBlock title="深色主题 / 描述">
  <template #demo>
    <div style="display: grid; gap: 12px;">
      <ScAlert
        effect="dark"
        title="Dark alert"
        type="primary"
        showIcon
        description="这是一段描述信息"
        closable
      />
    </div>
  </template>

  <template #source>

```vue
<template>
  <ScAlert
    effect="dark"
    title="Dark alert"
    type="primary"
    showIcon
    description="这是一段描述信息"
    closable
  />
</template>
```

  </template>
</DemoBlock>

## Alert API

### Alert Attributes

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | string | - | 标题（必填） |
| type | "primary" \| "success" \| "warning" \| "info" \| "danger" | "info" | 类型 |
| effect | "light" \| "dark" | "light" | 主题 |
| closable | boolean | false | 是否可关闭 |
| closeText | string | - | 自定义关闭文字 |
| showIcon | boolean | false | 是否显示图标 |
| description | string | - | 描述 |

### Alert Slots

| 插槽名 | 说明 |
| --- | --- |
| description | 自定义描述内容（优先级高于 `description` 属性） |

### Alert Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 点击关闭按钮后触发 | - |

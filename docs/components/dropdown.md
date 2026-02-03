---
title: Dropdown | V-Element
description: Dropdown 组件文档
outline: deep
---

<script setup lang="ts">
import { h, ref } from 'vue'
import type { MenuOptions } from '@/components/Dropdown/types'

const trigger = ref<'hover' | 'click'>('hover')
const selected = ref<string | number>('-')

const options: MenuOptions[] = [
  { key: '1', label: h('b', 'Bold item') },
  { key: '2', label: 'Disabled item', disabled: true },
  { key: '3', label: 'Divided item', divided: true },
]
</script>

# Dropdown 下拉菜单

将动作或菜单折叠到下拉面板中。

Dropdown 通常用于“同类操作较多但不希望占用太多空间”的场景。它基于 Tooltip 的弹出层能力实现，因此也支持触发方式、弹出位置等配置。

## 基础用法

通过 `menu-options` 传入菜单项数组。每一项包含 `key` 与 `label`，其中 `label` 支持字符串或 VNode（示例中用 `h` 创建了加粗文本）。

<DemoBlock title="基础用法">
  <template #demo>
    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <ScDropdown :menu-options="options" :trigger="trigger" @select="(e) => (selected = e.key)">
        <ScButton type="primary">下拉菜单</ScButton>
      </ScDropdown>
      <span style="color: var(--vp-c-text-2);">已选择：{{ selected }}</span>
    </div>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import type { MenuOptions } from '@/components/Dropdown/types'

const trigger = ref<'hover' | 'click'>('hover')
const selected = ref<string | number>('-')

const options: MenuOptions[] = [
  { key: '1', label: h('b', 'Bold item') },
  { key: '2', label: 'Disabled item', disabled: true },
  { key: '3', label: 'Divided item', divided: true },
]
</script>

<template>
  <ScDropdown :menu-options="options" :trigger="trigger" @select="(e) => (selected = e.key)">
    <ScButton type="primary">下拉菜单</ScButton>
  </ScDropdown>
  <span>已选择：{{ selected }}</span>
</template>
```

  </template>
</DemoBlock>

## Dropdown API

### Dropdown Attributes

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| menuOptions | MenuOptions[] | - | 菜单项（必填） |
| hideAfterClick | boolean | true | 点击后自动关闭 |
| trigger | "hover" \| "click" | "hover" | 触发方式 |
| placement | Placement | "bottom" | 弹出位置（Popper） |
| manual | boolean | false | 手动控制（配合实例方法） |
| popperOptions | Partial&lt;Options&gt; | - | Popper 配置 |
| transition | string | "fade" | 过渡名 |
| openDelay | number | 0 | 打开延迟（ms） |
| closeDelay | number | 0 | 关闭延迟（ms） |

### Dropdown Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 触发器内容（常见为按钮） |

### Dropdown Exposes

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| show | () => void | 显示菜单 |
| hide | () => void | 隐藏菜单 |

### Dropdown Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| visible-change | 显示/隐藏变化 | boolean |
| select | 点击菜单项 | MenuOptions |


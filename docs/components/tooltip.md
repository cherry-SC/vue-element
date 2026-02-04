---
title: Tooltip | V-Element
description: Tooltip 组件文档
outline: deep
---

<script setup lang="ts">
import { ref } from 'vue'
import type { TooltipInstance } from '@/components/Tooltip/types'

const tooltipRef = ref<TooltipInstance | null>(null)

const showManual = () => {
  tooltipRef.value?.show()
}

const hideManual = () => {
  tooltipRef.value?.hide()
}
</script>

# Tooltip 文字提示

用于 hover/click 时展示提示内容。

当页面元素本身难以承载完整说明（图标按钮、缩写字段、被省略的文本）时，Tooltip 可以在不打断布局的情况下补充信息。

## 使用场景

- 图标按钮的含义说明
- 表格/列表中被截断文本的完整展示
- 对输入项的规则提示或轻量引导

## 基础用法

Tooltip 的默认插槽是触发元素；浮层内容可以通过 `content` 属性传入，也可以使用 `#content` 插槽自定义。

### Hover 触发

<DemoBlock title="Hover 触发">
  <template #demo>
    <ScTooltip content="这是提示内容">
      <span style="cursor: pointer; display: inline-block; padding: 6px 10px; border: 1px solid var(--vp-c-divider); border-radius: 6px;">
        Hover 我
      </span>
    </ScTooltip>
  </template>

  <template #source>

```vue
<template>
  <ScTooltip content="这是提示内容">
    <span>Hover 我</span>
  </ScTooltip>
</template>
```

  </template>
</DemoBlock>

### Click 触发

<DemoBlock title="Click 触发（插槽内容）">
  <template #demo>
    <ScTooltip trigger="click">
      <ScButton type="primary">点击显示</ScButton>
      <template #content>
        <div style="padding: 6px 8px;">自定义内容</div>
      </template>
    </ScTooltip>
  </template>

  <template #source>

```vue
<template>
  <ScTooltip trigger="click">
    <ScButton type="primary">点击显示</ScButton>
    <template #content>
      <div>自定义内容</div>
    </template>
  </ScTooltip>
</template>
```

  </template>
</DemoBlock>

## 手动控制

当 `manual` 为 `true` 时，组件不会绑定 hover/click 事件，你可以通过组件实例方法来控制显示与隐藏。

<DemoBlock title="手动控制（实例方法）">
  <template #demo>
    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <ScButton type="primary" @click="showManual">显示</ScButton>
      <ScButton @click="hideManual">隐藏</ScButton>
      <ScTooltip ref="tooltipRef" manual content="这是手动控制的提示内容">
        <span style="cursor: default; display: inline-block; padding: 6px 10px; border: 1px dashed var(--vp-c-divider); border-radius: 6px;">
          目标元素
        </span>
      </ScTooltip>
    </div>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TooltipInstance } from '@/components/Tooltip/types'

const tooltipRef = ref<TooltipInstance | null>(null)

const showManual = () => {
  tooltipRef.value?.show()
}

const hideManual = () => {
  tooltipRef.value?.hide()
}
</script>

<template>
  <ScButton type="primary" @click="showManual">显示</ScButton>
  <ScButton @click="hideManual">隐藏</ScButton>

  <ScTooltip ref="tooltipRef" manual content="这是手动控制的提示内容">
    <span>目标元素</span>
  </ScTooltip>
</template>
```

  </template>
</DemoBlock>

## Tooltip API

### Tooltip Attributes

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| content | string | - | 文本内容（未提供 content 插槽时使用） |
| trigger | "hover" \| "click" | "hover" | 触发方式 |
| placement | Placement | "bottom" | 弹出位置（Popper） |
| manual | boolean | false | 手动控制（配合实例方法） |
| popperOptions | Partial&lt;Options&gt; | - | Popper 配置 |
| transition | string | "fade" | 过渡名 |
| openDelay | number | 0 | 打开延迟（ms） |
| closeDelay | number | 0 | 关闭延迟（ms） |

### Tooltip Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 触发元素 |
| content | 浮层内容 |

### Tooltip Exposes

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| show | () => void | 显示浮层（配合 `manual` 使用更直观） |
| hide | () => void | 隐藏浮层 |

### Tooltip Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| visible-change | 显示/隐藏变化 | boolean |


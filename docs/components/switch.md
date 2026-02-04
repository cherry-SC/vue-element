---
title: Switch | V-Element
description: Switch 组件文档
outline: deep
---

<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref(true)
const disabledValue = ref(true)
const textValue = ref(false)
const sizeLarge = ref(true)
const sizeSmall = ref(false)
const customValue = ref('on')
</script>

# Switch 开关

用于在两种状态之间切换。

适用于启用/禁用、开/关、是否生效等场景，支持文字提示、尺寸与自定义值。

## 基础用法

使用 `v-model` 绑定布尔值。

<DemoBlock title="基础用法">
  <template #demo>
    <ScSwitch v-model="basicValue" />
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref(true)
</script>

<template>
  <ScSwitch v-model="basicValue" />
</template>
```

  </template>
</DemoBlock>

## 禁用状态

`disabled` 会阻止切换。

<DemoBlock title="禁用状态">
  <template #demo>
    <ScSwitch v-model="disabledValue" disabled />
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const disabledValue = ref(true)
</script>

<template>
  <ScSwitch v-model="disabledValue" disabled />
</template>
```

  </template>
</DemoBlock>

## 文案提示

通过 `activeText` / `inactiveText` 设置开关内文字。

<DemoBlock title="文案提示">
  <template #demo>
    <ScSwitch v-model="textValue" activeText="开" inactiveText="关" />
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const textValue = ref(false)
</script>

<template>
  <ScSwitch v-model="textValue" activeText="开" inactiveText="关" />
</template>
```

  </template>
</DemoBlock>

## 尺寸

通过 `size` 设置尺寸，支持 `large` / `small`。

<DemoBlock title="尺寸">
  <template #demo>
    <div style="display: flex; gap: 12px; align-items: center;">
      <ScSwitch v-model="sizeLarge" size="large" />
      <ScSwitch v-model="sizeSmall" size="small" />
    </div>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const sizeLarge = ref(true)
const sizeSmall = ref(false)
</script>

<template>
  <ScSwitch v-model="sizeLarge" size="large" />
  <ScSwitch v-model="sizeSmall" size="small" />
</template>
```

  </template>
</DemoBlock>

## 自定义值

使用 `activeValue` / `inactiveValue` 自定义开关值。

<DemoBlock title="自定义值">
  <template #demo>
    <div style="display: flex; gap: 12px; align-items: center;">
      <ScSwitch v-model="customValue" activeValue="on" inactiveValue="off" />
      <span style="color: var(--vp-c-text-2);">当前值：{{ customValue }}</span>
    </div>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const customValue = ref('on')
</script>

<template>
  <div>
    <ScSwitch v-model="customValue" activeValue="on" inactiveValue="off" />
    <span>当前值：{{ customValue }}</span>
  </div>
</template>
```

  </template>
</DemoBlock>

## Switch API

### Switch Attributes

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | boolean \| string \| number | - | v-model 绑定值 |
| disabled | boolean | false | 是否禁用 |
| activeText | string | - | 选中时显示的文字 |
| inactiveText | string | - | 未选中时显示的文字 |
| activeValue | boolean \| string \| number | true | 选中时的值 |
| inactiveValue | boolean \| string \| number | false | 未选中时的值 |
| name | string | - | 原生 name 属性 |
| id | string | - | 原生 id 属性 |
| size | "small" \| "large" | - | 尺寸 |

### Switch Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | v-model 更新 | boolean \| string \| number |
| change | 值变化 | boolean \| string \| number |

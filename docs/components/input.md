---
title: Input | V-Element
description: Input 组件文档
outline: deep
---

<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref('Hello')
const disabledValue = ref('Disabled')
const readonlyValue = ref('Readonly')
const largeValue = ref('Large')
const smallValue = ref('Small')
const clearableValue = ref('Clear me')
const passwordValue = ref('123456')
const slotValue = ref('Input')
const textareaValue = ref('多行文本')
</script>

# Input 输入框

用于输入与编辑单行或多行文本内容。

适用于表单、搜索、设置等场景，可结合尺寸、清空、密码可见、前后置与前后缀等能力完成更清晰的交互表达。

## 基础用法

使用 `v-model` 双向绑定输入值。

<DemoBlock title="基础用法">
  <template #demo>
    <ScInput v-model="basicValue" placeholder="请输入内容" />
    <p style="font-size: 12px;margin-top: 5px;margin-left: 5px;">输入值：{{ basicValue }}</p>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref('Hello')
</script>

<template>
  <ScInput v-model="basicValue" placeholder="请输入内容" />
  <p style="font-size: 12px;margin-top: 5px;margin-left: 5px;">输入值：{{ basicValue }}</p>
</template>
```

  </template>
</DemoBlock>

## 禁用与只读

禁用会阻止输入与交互；只读可聚焦但不可编辑。

<DemoBlock title="禁用与只读">
  <template #demo>
    <div style="display: grid; gap: 12px;">
      <ScInput v-model="disabledValue" disabled />
      <ScInput v-model="readonlyValue" readonly />
    </div>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const disabledValue = ref('Disabled')
const readonlyValue = ref('Readonly')
</script>

<template>
  <ScInput v-model="disabledValue" disabled />
  <ScInput v-model="readonlyValue" readonly />
</template>
```

  </template>
</DemoBlock>

## 尺寸

通过 `size` 设置输入框尺寸，支持 `large` / `small`。

<DemoBlock title="尺寸">
  <template #demo>
    <div style="display: grid; gap: 12px;">
      <ScInput v-model="largeValue" size="large" />
      <ScInput v-model="smallValue" size="small" />
    </div>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const largeValue = ref('Large')
const smallValue = ref('Small')
</script>

<template>
  <ScInput v-model="largeValue" size="large" />
  <ScInput v-model="smallValue" size="small" />
</template>
```

  </template>
</DemoBlock>

## 可清空

设置 `clearable` 后，输入框在聚焦且有值时显示清空按钮。

<DemoBlock title="可清空">
  <template #demo>
    <ScInput v-model="clearableValue" clearable placeholder="可清空输入" />
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const clearableValue = ref('Clear me')
</script>

<template>
  <ScInput v-model="clearableValue" clearable placeholder="可清空输入" />
</template>
```

  </template>
</DemoBlock>

## 密码可见

设置 `showPassword` 后，输入框会提供显示/隐藏密码的切换按钮。

<DemoBlock title="密码可见">
  <template #demo>
    <ScInput v-model="passwordValue" type="password" showPassword />
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const passwordValue = ref('123456')
</script>

<template>
  <ScInput v-model="passwordValue" type="password" showPassword />
</template>
```

  </template>
</DemoBlock>

## 前后置与前后缀

`prepend` / `append` 用于输入框外侧内容；`prefix` / `suffix` 用于输入框内部图标或提示。

<DemoBlock title="前后置与前后缀">
  <template #demo>
    <ScInput v-model="slotValue" placeholder="请输入内容">
      <template #prepend>http://</template>
      <template #append>.com</template>
      <template #prefix>前缀</template>
      <template #suffix>后缀</template>
    </ScInput>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const slotValue = ref('Input')
</script>

<template>
  <ScInput v-model="slotValue" placeholder="请输入内容">
    <template #prepend>http://</template>
    <template #append>.com</template>
    <template #prefix>前缀</template>
    <template #suffix>后缀</template>
  </ScInput>
</template>
```

  </template>
</DemoBlock>

## 文本域

设置 `type="textarea"` 可使用多行输入。

<DemoBlock title="文本域">
  <template #demo>
    <ScInput v-model="textareaValue" type="textarea" placeholder="请输入多行文本" />
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const textareaValue = ref('多行文本')
</script>

<template>
  <ScInput v-model="textareaValue" type="textarea" placeholder="请输入多行文本" />
</template>
```

  </template>
</DemoBlock>

## Input API

### Input Attributes

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | string | - | 输入框值（v-model） |
| type | string | text | 输入框类型（text / password / textarea 等） |
| size | "large" \| "small" | - | 尺寸 |
| disabled | boolean | false | 是否禁用 |
| clearable | boolean | false | 是否显示清空按钮 |
| showPassword | boolean | false | 是否显示密码可见切换 |
| placeholder | string | - | 占位文本 |
| readonly | boolean | false | 是否只读 |
| autocomplete | string | off | 原生 autocomplete 属性 |
| autofocus | boolean | false | 是否自动聚焦 |
| form | string | - | 关联的表单 id |

### Input Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | v-model 更新 | string |
| input | 输入时触发 | string |
| change | 值变化时触发 | string |
| focus | 获取焦点 | FocusEvent |
| blur | 失去焦点 | FocusEvent |
| clear | 点击清空按钮 | - |

### Input Slots

| 插槽名 | 说明 |
| --- | --- |
| prepend | 前置内容 |
| append | 后置内容 |
| prefix | 前缀内容 |
| suffix | 后缀内容 |

### Input Exposes

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| ref | HTMLInputElement \| HTMLTextAreaElement | 内部输入框引用 |

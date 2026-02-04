---
title: Select | V-Element
description: Select 组件文档
outline: deep
---

<script setup lang="ts">
import { h, ref } from 'vue'
import type { SelectOption } from '@/components/Select/types'

const basicValue = ref('beijing')
const basicOptions: SelectOption[] = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
]

const disabledValue = ref('shanghai')
const disabledOptions: SelectOption[] = [
  { label: '北京', value: 'beijing' },
  { label: '上海（禁用）', value: 'shanghai', disabled: true },
  { label: '广州', value: 'guangzhou' },
]

const clearableValue = ref('guangzhou')

const filterableValue = ref('')
const filterableOptions: SelectOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Apricot', value: 'apricot' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Grape', value: 'grape' },
  { label: 'Lemon', value: 'lemon' },
]

const customFilterValue = ref('')
const customFilterOptions: SelectOption[] = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
  { label: 'Angular', value: 'angular' },
]
const customFilterMethod = (keyword: string): SelectOption[] => {
  const trimmed = keyword.trim().toLowerCase()
  if (!trimmed) return customFilterOptions
  return customFilterOptions.filter((o) => o.label.toLowerCase().startsWith(trimmed))
}

const remoteValue = ref('')
const remoteOptions = ref<SelectOption[]>([])
const allRemoteCandidates: SelectOption[] = [
  { label: 'Alice', value: 'alice' },
  { label: 'Bob', value: 'bob' },
  { label: 'Charlie', value: 'charlie' },
  { label: 'David', value: 'david' },
  { label: 'Eve', value: 'eve' },
  { label: 'Mallory', value: 'mallory' },
  { label: 'Trent', value: 'trent' },
]
const remoteMethod = async (keyword: string): Promise<SelectOption[]> => {
  const trimmed = keyword.trim().toLowerCase()
  await new Promise((r) => setTimeout(r, 300))
  if (!trimmed) return allRemoteCandidates.slice(0, 5)
  return allRemoteCandidates.filter((o) => o.label.toLowerCase().includes(trimmed))
}
const remoteMethodWrapper = async (keyword: string): Promise<SelectOption[]> => {
  const options = await remoteMethod(keyword)
  remoteOptions.value = options
  return options
}
const renderLabelValue = ref('primary')
const renderLabelOptions: SelectOption[] = [
  { label: 'Primary', value: 'primary' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Danger', value: 'danger' },
  { label: 'Info', value: 'info' },
]
const renderLabel = (option: SelectOption) =>
  h(
    'span',
    { style: 'display: inline-flex; align-items: center; gap: 8px;' },
    [
      h('span', {
        style: `width: 8px; height: 8px; border-radius: 50%; background: var(--sc-color-${option.value}); display: inline-block;`,
      }),
      h('span', option.label),
    ]
  )
</script>

# Select 选择器

用于在多个选项中选择一个值。

Select 提供“点击展开 + 选项列表”的交互形式，支持禁用、可清空、筛选（本地/自定义/远程）与键盘操作，适合表单、搜索筛选、设置项等场景。

## 基础用法

通过 `v-model` 绑定选中值，通过 `options` 传入候选项列表。

<DemoBlock title="基础用法">
  <template #demo>
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <ScSelect v-model="basicValue" :options="basicOptions" placeholder="请选择城市" />
      <div style="font-size: 12px; color: var(--vp-c-text-2);">当前值：{{ basicValue }}</div>
    </div>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from '@/components/Select/types'

const basicValue = ref('beijing')
const basicOptions: SelectOption[] = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
]
</script>

<template>
  <ScSelect v-model="basicValue" :options="basicOptions" placeholder="请选择城市" />
  <div>当前值：{{ basicValue }}</div>
</template>
```

  </template>
</DemoBlock>

## 禁用

`disabled` 会禁用整个 Select；选项上的 `disabled` 会禁用单项选择。

<DemoBlock title="禁用与禁用选项">
  <template #demo>
    <div style="display: grid; gap: 12px; align-items: start;">
      <ScSelect v-model="disabledValue" :options="disabledOptions" placeholder="存在禁用项" />
      <ScSelect v-model="disabledValue" disabled :options="disabledOptions" placeholder="整体禁用" />
    </div>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from '@/components/Select/types'

const disabledValue = ref('shanghai')
const disabledOptions: SelectOption[] = [
  { label: '北京', value: 'beijing' },
  { label: '上海（禁用）', value: 'shanghai', disabled: true },
  { label: '广州', value: 'guangzhou' },
]
</script>

<template>
  <ScSelect v-model="disabledValue" :options="disabledOptions" placeholder="存在禁用项" />
  <ScSelect v-model="disabledValue" disabled :options="disabledOptions" placeholder="整体禁用" />
</template>
```

  </template>
</DemoBlock>

## 可清空

设置 `clearable` 后，鼠标悬浮且已选择时会显示清空按钮；点击后会把 `v-model` 置为空字符串，并触发 `clear` 事件。

<DemoBlock title="可清空">
  <template #demo>
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <ScSelect v-model="clearableValue" clearable :options="basicOptions" placeholder="可清空" />
      <div style="font-size: 12px; color: var(--vp-c-text-2);">当前值：{{ clearableValue || '(空)' }}</div>
    </div>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from '@/components/Select/types'

const clearableValue = ref('guangzhou')
const basicOptions: SelectOption[] = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
]
</script>

<template>
  <ScSelect v-model="clearableValue" clearable :options="basicOptions" placeholder="可清空" />
  <div>当前值：{{ clearableValue || '(空)' }}</div>
</template>
```

  </template>
</DemoBlock>

## 可筛选（本地过滤）

开启 `filterable` 后，下拉打开时可以输入关键字进行过滤。默认过滤规则是 `label.includes(keyword)`。

<DemoBlock title="可筛选（本地过滤）">
  <template #demo>
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <ScSelect
        v-model="filterableValue"
        filterable
        :options="filterableOptions"
        placeholder="请输入关键字筛选"
      />
      <div style="font-size: 12px; color: var(--vp-c-text-2);">当前值：{{ filterableValue || '(未选择)' }}</div>
    </div>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from '@/components/Select/types'

const filterableValue = ref('')
const filterableOptions: SelectOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Apricot', value: 'apricot' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Grape', value: 'grape' },
  { label: 'Lemon', value: 'lemon' },
]
</script>

<template>
  <ScSelect
    v-model="filterableValue"
    filterable
    :options="filterableOptions"
    placeholder="请输入关键字筛选"
  />
</template>
```

  </template>
</DemoBlock>

## 自定义过滤逻辑

通过 `filter-method` 接管过滤过程：传入关键字，返回过滤后的 `options` 数组。

<DemoBlock title="自定义过滤逻辑（filter-method）">
  <template #demo>
    <ScSelect
      v-model="customFilterValue"
      filterable
      :options="customFilterOptions"
      :filter-method="customFilterMethod"
      placeholder="仅支持前缀匹配"
    />
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from '@/components/Select/types'

const customFilterValue = ref('')
const customFilterOptions: SelectOption[] = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
  { label: 'Angular', value: 'angular' },
]

const customFilterMethod = (keyword: string): SelectOption[] => {
  const trimmed = keyword.trim().toLowerCase()
  if (!trimmed) return customFilterOptions
  return customFilterOptions.filter((o) => o.label.toLowerCase().startsWith(trimmed))
}
</script>

<template>
  <ScSelect
    v-model="customFilterValue"
    filterable
    :options="customFilterOptions"
    :filter-method="customFilterMethod"
    placeholder="仅支持前缀匹配"
  />
</template>
```

  </template>
</DemoBlock>

## 远程搜索

设置 `remote` + `remote-method` 后，会以异步方式获取列表数据。组件会展示加载状态，并对输入做 300ms 防抖（避免频繁请求）。

<DemoBlock title="远程搜索（remote）">
  <template #demo>
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <ScSelect
        v-model="remoteValue"
        filterable
        remote
        :options="remoteOptions"
        :remote-method="remoteMethodWrapper"
        placeholder="输入关键字搜索用户"
      />
      <div style="font-size: 12px; color: var(--vp-c-text-2);">当前值：{{ remoteValue || '(未选择)' }}</div>
    </div>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from '@/components/Select/types'

const remoteValue = ref('')
const remoteOptions = ref<SelectOption[]>([])

const allRemoteCandidates: SelectOption[] = [
  { label: 'Alice', value: 'alice' },
  { label: 'Bob', value: 'bob' },
  { label: 'Charlie', value: 'charlie' },
  { label: 'David', value: 'david' },
  { label: 'Eve', value: 'eve' },
  { label: 'Mallory', value: 'mallory' },
  { label: 'Trent', value: 'trent' },
]

const remoteMethod = async (keyword: string): Promise<SelectOption[]> => {
  const trimmed = keyword.trim().toLowerCase()
  await new Promise((r) => setTimeout(r, 300))
  if (!trimmed) return allRemoteCandidates.slice(0, 5)
  return allRemoteCandidates.filter((o) => o.label.toLowerCase().includes(trimmed))
}
</script>

<template>
  <ScSelect
    v-model="remoteValue"
    filterable
    remote
    :options="remoteOptions"
    :remote-method="async (q) => (remoteOptions = await remoteMethod(q))"
    placeholder="输入关键字搜索用户"
  />
</template>
```

  </template>
</DemoBlock>

## 自定义选项渲染

通过 `render-label` 自定义下拉列表中每一项的展示内容（返回 VNode）。常用于带颜色标识、图标、富文本等场景。

<DemoBlock title="自定义渲染（render-label）">
  <template #demo>
    <ScSelect v-model="renderLabelValue" :options="renderLabelOptions" :render-label="renderLabel" />
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { h, ref } from 'vue'
import type { SelectOption } from '@/components/Select/types'

const renderLabelValue = ref('primary')
const renderLabelOptions: SelectOption[] = [
  { label: 'Primary', value: 'primary' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Danger', value: 'danger' },
  { label: 'Info', value: 'info' },
]

const renderLabel = (option: SelectOption) =>
  h(
    'span',
    { style: 'display: inline-flex; align-items: center; gap: 8px;' },
    [
      h('span', {
        style: `width: 8px; height: 8px; border-radius: 50%; background: var(--sc-color-${option.value}); display: inline-block;`,
      }),
      h('span', option.label),
    ]
  )
</script>

<template>
  <ScSelect v-model="renderLabelValue" :options="renderLabelOptions" :render-label="renderLabel" />
</template>
```

  </template>
</DemoBlock>

## 交互说明

### 下拉面板显示/隐藏

- 点击组件区域：切换显示/隐藏
- 点击组件外部：自动关闭
- 触发 `visible-change` 事件：每次显示/隐藏都会触发，参数为 `boolean`

### 键盘操作

在输入框聚焦时：

- Enter：打开下拉 / 选中高亮项 / 关闭下拉
- Esc：关闭下拉
- ArrowUp / ArrowDown：循环高亮上一项 / 下一项（不选中，仅移动高亮）

## Select API

### Select Attributes

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | string | - | 选中值（v-model） |
| options | SelectOption[] | [] | 选项列表 |
| placeholder | string | - | 占位提示 |
| disabled | boolean | false | 是否禁用 |
| clearable | boolean | false | 是否可清空 |
| renderLabel | (option: SelectOption) => VNode | - | 自定义选项渲染（下拉列表项） |
| filterable | boolean | false | 是否可筛选 |
| filterMethod | (keyword: string) => SelectOption[] | - | 自定义本地过滤方法 |
| remote | boolean | false | 是否远程搜索（启用 300ms 防抖） |
| remoteMethod | (keyword: string) => Promise&lt;SelectOption[]&gt; | - | 远程搜索方法 |

### SelectOption

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| label | string | - | 展示文本 |
| value | string | - | 选项值 |
| disabled | boolean | false | 是否禁用 |

### Select Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | v-model 更新 | string |
| change | 选中值变化 | string |
| visible-change | 下拉显示/隐藏变化 | boolean |
| clear | 点击清空按钮 | - |

---
title: Input | V-Element
description: Input 组件文档
outline: deep
---

<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref('')
const clearableValue = ref('可清空')
const clearedCount = ref(0)
const passwordValue = ref('123456')
const textareaValue = ref('这是多行文本\n支持换行')
const slotValue = ref('Hello')
</script>

# Input 输入框

用于接收用户输入，常见于表单、搜索、筛选等场景。

## 基础用法

通过 `v-model` 绑定输入值，使用 `placeholder` 提示输入内容。

<DemoBlock title="基础用法">
  <template #demo>
    <div style="display: grid; gap: 12px; max-width: 360px;">
      <ScInput v-model="basicValue" placeholder="请输入内容" />
      <div style="color: var(--vp-c-text-2); font-size: 13px;">当前值：{{ basicValue }}</div>
    </div>
  </template>
</DemoBlock>

## 可清空

设置 `clearable` 后，在聚焦且有内容时会显示清空按钮；点击触发 `clear` 事件，并同步更新 `v-model`。

<DemoBlock title="可清空（clearable）">
  <template #demo>
    <div style="display: grid; gap: 12px; max-width: 360px;">
      <ScInput
        v-model="clearableValue"
        clearable
        placeholder="可清空"
        @clear="clearedCount++"
      />
      <div style="color: var(--vp-c-text-2); font-size: 13px;">
        值：{{ clearableValue }}（已清空：{{ clearedCount }} 次）
      </div>
    </div>
  </template>
</DemoBlock>

## 密码可见切换

配合 `type="password"` 与 `showPassword`，支持切换密码可见。

<DemoBlock title="密码可见切换（showPassword）">
  <template #demo>
    <div style="display: grid; gap: 12px; max-width: 360px;">
      <ScInput v-model="passwordValue" type="password" showPassword placeholder="请输入密码" />
    </div>
  </template>
</DemoBlock>

## 文本域

设置 `type="textarea"` 使用多行输入。

<DemoBlock title="文本域（textarea）">
  <template #demo>
    <div style="display: grid; gap: 12px; max-width: 420px;">
      <ScInput v-model="textareaValue" type="textarea" placeholder="请输入多行内容" />
    </div>
  </template>
</DemoBlock>

## 尺寸、禁用与只读

通过 `size` 控制输入框高度；通过 `disabled` 与 `readonly` 控制交互状态。

<DemoBlock title="尺寸 / 禁用 / 只读">
  <template #demo>
    <div style="display: grid; gap: 12px; max-width: 360px;">
      <ScInput v-model="slotValue" placeholder="默认尺寸" />
      <ScInput v-model="slotValue" size="large" placeholder="large" />
      <ScInput v-model="slotValue" size="small" placeholder="small" />
      <ScInput v-model="slotValue" disabled placeholder="disabled" />
      <ScInput v-model="slotValue" readonly placeholder="readonly" />
    </div>
  </template>
</DemoBlock>

## 前后缀与前后置

通过 `prefix / suffix / prepend / append` 插槽可以扩展输入框内容。

<DemoBlock title="插槽（prefix / suffix / prepend / append）">
  <template #demo>
    <div style="display: grid; gap: 12px; max-width: 420px;">
      <ScInput v-model="slotValue" placeholder="请输入内容">
        <template #prepend>https://</template>
        <template #append>.com</template>
      </ScInput>

      <ScInput v-model="slotValue" placeholder="用户名">
        <template #prefix>
          <ScIcon icon="user" />
        </template>
      </ScInput>
    </div>
  </template>
</DemoBlock>

## Input API

### Input Attributes

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | string | - | 绑定值（必填） |
| type | string | "text" | 输入框类型（`text` / `password` / `textarea` 等） |
| size | "large" \| "small" | - | 尺寸 |
| disabled | boolean | false | 是否禁用 |
| clearable | boolean | false | 是否显示清空按钮 |
| showPassword | boolean | false | 是否显示“切换密码可见”按钮 |
| placeholder | string | - | 占位提示文本 |
| readonly | boolean | false | 是否只读 |
| autocomplete | string | "off" | 原生 autocomplete 属性值 |
| autofocus | boolean | false | 是否自动聚焦 |
| form | string | - | 关联的 form id（原生 input 属性） |

### Input Slots

| 插槽名 | 说明 |
| --- | --- |
| prepend | 前置内容（输入框左侧） |
| append | 后置内容（输入框右侧） |
| prefix | 前缀内容（输入框内部左侧） |
| suffix | 后缀内容（输入框内部右侧） |

### Input Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | v-model 更新 | string |
| input | 输入时触发 | string |
| change | 值变化时触发 | string |
| focus | 获得焦点 | FocusEvent |
| blur | 失去焦点 | FocusEvent |
| clear | 点击清空按钮 | - |

### Input Exposes

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| ref | HTMLInputElement \| HTMLTextAreaElement | 输入框 DOM 引用 |

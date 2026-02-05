---
title: Form | V-Element
description: Form 组件文档
outline: deep
---

<script setup lang="ts">
import { reactive, ref } from 'vue'

const basicModel = reactive({
  username: '',
  email: '',
})
const basicRules = {
  username: [],
  email: [],
}

const validateModel = reactive({
  username: '',
  password: '',
  desc: '',
})
const validateRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { min: 6, message: '至少 6 位', trigger: 'change' },
  ],
  desc: [
    { max: 20, message: '最多 20 个字', trigger: 'input' },
  ],
}

const actionModel = reactive({
  account: '',
  phone: '',
})
const actionRules = {
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'change' },
    { pattern: /^1\d{10}$/, message: '手机号格式错误', trigger: 'change' },
  ],
}
const formRef = ref()
const validateResult = ref('')

const handleValidate = async () => {
  validateResult.value = ''
  try {
    await formRef.value?.validate()
    validateResult.value = '校验通过'
  } catch (e) {
    validateResult.value = '校验失败'
  }
}
const handleResetAll = () => {
  formRef.value?.resetFileds()
  validateResult.value = ''
}
const handleClearAll = () => {
  formRef.value?.clearValidate()
  validateResult.value = ''
}
const handleResetAccount = () => {
  formRef.value?.resetFileds(['account'])
}
const handleClearAccount = () => {
  formRef.value?.clearValidate(['account'])
}

const slotModel = reactive({
  code: '',
})
const slotRules = {
  code: [
    { required: true, message: '请输入验证码', trigger: 'change' },
  ],
}

const nativeModel = reactive({
  title: '',
  category: '',
  detail: '',
})
const nativeRules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
  ],
  category: [
    { required: true, message: '请选择分类', trigger: 'change' },
  ],
  detail: [
    { max: 30, message: '最多 30 个字', trigger: 'input' },
  ],
}

const customModel = reactive({
  email: '',
  password: '',
  confirm: '',
})
const customRules = {
  email: [
    {
      validator: (_rule: unknown, value: string) => {
        if (!value) return Promise.reject('请输入邮箱')
        if (!/^\S+@\S+\.\S+$/.test(value)) return Promise.reject('邮箱格式错误')
        return Promise.resolve()
      },
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
  ],
  confirm: [
    {
      validator: (_rule: unknown, value: string) => {
        if (!value) return Promise.reject('请再次输入密码')
        if (value !== customModel.password) return Promise.reject('两次输入不一致')
        return Promise.resolve()
      },
      trigger: 'change',
    },
  ],
}
</script>

# Form 表单

用于承载表单字段与校验逻辑。`ScForm` 负责提供校验上下文与统一操作；`ScFormItem` 承载单个字段的 label、校验状态与错误提示。

## 基础用法

通过 `model` 绑定表单数据，通过 `rules` 指定校验规则。`ScFormItem` 使用 `label` 与 `prop` 对应字段。

<DemoBlock title="基础用法">
  <template #demo>
    <ScForm :model="basicModel" :rules="basicRules">
      <ScFormItem label="用户名" prop="username">
        <ScInput v-model="basicModel.username" placeholder="请输入用户名" />
      </ScFormItem>
      <ScFormItem label="邮箱" prop="email">
        <ScInput v-model="basicModel.email" placeholder="请输入邮箱" />
      </ScFormItem>
    </ScForm>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { reactive } from 'vue'

const basicModel = reactive({
  username: '',
  email: '',
})
const basicRules = {
  username: [],
  email: [],
}
</script>

<template>
  <ScForm :model="basicModel" :rules="basicRules">
    <ScFormItem label="用户名" prop="username">
      <ScInput v-model="basicModel.username" placeholder="请输入用户名" />
    </ScFormItem>
    <ScFormItem label="邮箱" prop="email">
      <ScInput v-model="basicModel.email" placeholder="请输入邮箱" />
    </ScFormItem>
  </ScForm>
</template>
```

  </template>
</DemoBlock>

## 表单校验

`rules` 使用 async-validator 的规则结构，`trigger` 对应输入组件触发校验的时机（如 `blur` / `change` / `input`）。

<DemoBlock title="校验与必填标识">
  <template #demo>
    <ScForm :model="validateModel" :rules="validateRules">
      <ScFormItem label="用户名" prop="username">
        <ScInput v-model="validateModel.username" placeholder="失焦触发校验" />
      </ScFormItem>
      <ScFormItem label="密码" prop="password">
        <ScInput v-model="validateModel.password" type="password" placeholder="输入触发 change 校验" />
      </ScFormItem>
      <ScFormItem label="备注" prop="desc">
        <ScInput v-model="validateModel.desc" placeholder="输入触发 input 校验" />
      </ScFormItem>
    </ScForm>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { reactive } from 'vue'

const validateModel = reactive({
  username: '',
  password: '',
  desc: '',
})
const validateRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { min: 6, message: '至少 6 位', trigger: 'change' },
  ],
  desc: [
    { max: 20, message: '最多 20 个字', trigger: 'input' },
  ],
}
</script>

<template>
  <ScForm :model="validateModel" :rules="validateRules">
    <ScFormItem label="用户名" prop="username">
      <ScInput v-model="validateModel.username" placeholder="失焦触发校验" />
    </ScFormItem>
    <ScFormItem label="密码" prop="password">
      <ScInput v-model="validateModel.password" type="password" placeholder="输入触发 change 校验" />
    </ScFormItem>
    <ScFormItem label="备注" prop="desc">
      <ScInput v-model="validateModel.desc" placeholder="输入触发 input 校验" />
    </ScFormItem>
  </ScForm>
</template>
```

  </template>
</DemoBlock>

## 自定义规则

通过 `validator` 自定义校验逻辑，可返回 `Promise.reject('错误信息')` 或 `Promise.resolve()`，并配合 `trigger` 控制触发时机。

<DemoBlock title="自定义校验规则">
  <template #demo>
    <ScForm :model="customModel" :rules="customRules">
      <ScFormItem label="邮箱" prop="email">
        <ScInput v-model="customModel.email" placeholder="失焦触发校验" />
      </ScFormItem>
      <ScFormItem label="密码" prop="password">
        <ScInput v-model="customModel.password" type="password" placeholder="输入触发 change 校验" />
      </ScFormItem>
      <ScFormItem label="确认密码" prop="confirm">
        <ScInput v-model="customModel.confirm" type="password" placeholder="与密码一致" />
      </ScFormItem>
    </ScForm>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { reactive } from 'vue'

const customModel = reactive({
  email: '',
  password: '',
  confirm: '',
})
const customRules = {
  email: [
    {
      validator: (_rule: unknown, value: string) => {
        if (!value) return Promise.reject('请输入邮箱')
        if (!/^\S+@\S+\.\S+$/.test(value)) return Promise.reject('邮箱格式错误')
        return Promise.resolve()
      },
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
  ],
  confirm: [
    {
      validator: (_rule: unknown, value: string) => {
        if (!value) return Promise.reject('请再次输入密码')
        if (value !== customModel.password) return Promise.reject('两次输入不一致')
        return Promise.resolve()
      },
      trigger: 'change',
    },
  ],
}
</script>

<template>
  <ScForm :model="customModel" :rules="customRules">
    <ScFormItem label="邮箱" prop="email">
      <ScInput v-model="customModel.email" placeholder="失焦触发校验" />
    </ScFormItem>
    <ScFormItem label="密码" prop="password">
      <ScInput v-model="customModel.password" type="password" placeholder="输入触发 change 校验" />
    </ScFormItem>
    <ScFormItem label="确认密码" prop="confirm">
      <ScInput v-model="customModel.confirm" type="password" placeholder="与密码一致" />
    </ScFormItem>
  </ScForm>
</template>
```

  </template>
</DemoBlock>

## 原生控件

原生 `input` / `textarea` / `select` 不会自动触发校验，需要在事件里手动调用 `validate`。由于样式被 reset，需要自行补充样式。

<DemoBlock title="原生 input / textarea / select">
  <template #demo>
    <ScForm :model="nativeModel" :rules="nativeRules">
      <ScFormItem label="标题" prop="title">
        <template #default="{ validate }">
          <input
            v-model="nativeModel.title"
            placeholder="blur 触发校验"
            @blur="validate('blur')"
            style="height: 32px; padding: 0 10px; border: 1px solid var(--sc-border-color); border-radius: 4px; outline: none;"
          />
        </template>
      </ScFormItem>
      <ScFormItem label="分类" prop="category">
        <template #default="{ validate }">
          <select
            v-model="nativeModel.category"
            @change="validate('change')"
            style="height: 32px; padding: 0 10px; border: 1px solid var(--sc-border-color); border-radius: 4px; outline: none; background: transparent;"
          >
            <option disabled value="">请选择</option>
            <option value="news">新闻</option>
            <option value="product">产品</option>
            <option value="other">其他</option>
          </select>
        </template>
      </ScFormItem>
      <ScFormItem label="说明" prop="detail">
        <template #default="{ validate }">
          <textarea
            v-model="nativeModel.detail"
            placeholder="input 触发校验"
            @input="validate('input')"
            rows="2"
            style="width: 260px; padding: 6px 10px; border: 1px solid var(--sc-border-color); border-radius: 4px; outline: none; resize: vertical;"
          />
        </template>
      </ScFormItem>
    </ScForm>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { reactive } from 'vue'

const nativeModel = reactive({
  title: '',
  category: '',
  detail: '',
})
const nativeRules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
  ],
  category: [
    { required: true, message: '请选择分类', trigger: 'change' },
  ],
  detail: [
    { max: 30, message: '最多 30 个字', trigger: 'input' },
  ],
}
</script>

<template>
  <ScForm :model="nativeModel" :rules="nativeRules">
    <ScFormItem label="标题" prop="title">
      <template #default="{ validate }">
        <input
          v-model="nativeModel.title"
          placeholder="blur 触发校验"
          @blur="validate('blur')"
          style="height: 32px; padding: 0 10px; border: 1px solid var(--sc-border-color); border-radius: 4px; outline: none;"
        />
      </template>
    </ScFormItem>
    <ScFormItem label="分类" prop="category">
      <template #default="{ validate }">
        <select
          v-model="nativeModel.category"
          @change="validate('change')"
          style="height: 32px; padding: 0 10px; border: 1px solid var(--sc-border-color); border-radius: 4px; outline: none; background: transparent;"
        >
          <option disabled value="">请选择</option>
          <option value="news">新闻</option>
          <option value="product">产品</option>
          <option value="other">其他</option>
        </select>
      </template>
    </ScFormItem>
    <ScFormItem label="说明" prop="detail">
      <template #default="{ validate }">
        <textarea
          v-model="nativeModel.detail"
          placeholder="input 触发校验"
          @input="validate('input')"
          rows="2"
          style="width: 260px; padding: 6px 10px; border: 1px solid var(--sc-border-color); border-radius: 4px; outline: none; resize: vertical;"
        />
      </template>
    </ScFormItem>
  </ScForm>
</template>
```

  </template>
</DemoBlock>

## 表单方法

通过 `ref` 获取表单实例，调用 `validate` / `resetFileds` / `clearValidate`。`resetFileds` 与 `clearValidate` 支持传入字段数组进行局部操作。

<DemoBlock title="校验、重置、清理">
  <template #demo>
    <div style="display: grid; gap: 10px;">
      <ScForm ref="formRef" :model="actionModel" :rules="actionRules">
        <ScFormItem label="账号" prop="account">
          <ScInput v-model="actionModel.account" placeholder="请输入账号" />
        </ScFormItem>
        <ScFormItem label="手机号" prop="phone">
          <ScInput v-model="actionModel.phone" placeholder="请输入手机号" />
        </ScFormItem>
      </ScForm>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <ScButton type="primary" @click="handleValidate">提交校验</ScButton>
        <ScButton @click="handleResetAll">重置全部</ScButton>
        <ScButton @click="handleClearAll">清理全部校验</ScButton>
        <ScButton @click="handleResetAccount">重置账号</ScButton>
        <ScButton @click="handleClearAccount">清理账号校验</ScButton>
      </div>
      <div style="font-size: 12px; color: var(--vp-c-text-2);">
        校验结果：{{ validateResult || '未触发' }}
      </div>
    </div>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'

const actionModel = reactive({
  account: '',
  phone: '',
})
const actionRules = {
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'change' },
    { pattern: /^1\d{10}$/, message: '手机号格式错误', trigger: 'change' },
  ],
}
const formRef = ref()
const validateResult = ref('')

const handleValidate = async () => {
  validateResult.value = ''
  try {
    await formRef.value?.validate()
    validateResult.value = '校验通过'
  } catch (e) {
    validateResult.value = '校验失败'
  }
}
const handleResetAll = () => {
  formRef.value?.resetFileds()
  validateResult.value = ''
}
const handleClearAll = () => {
  formRef.value?.clearValidate()
  validateResult.value = ''
}
const handleResetAccount = () => {
  formRef.value?.resetFileds(['account'])
}
const handleClearAccount = () => {
  formRef.value?.clearValidate(['account'])
}
</script>

<template>
  <ScForm ref="formRef" :model="actionModel" :rules="actionRules">
    <ScFormItem label="账号" prop="account">
      <ScInput v-model="actionModel.account" placeholder="请输入账号" />
    </ScFormItem>
    <ScFormItem label="手机号" prop="phone">
      <ScInput v-model="actionModel.phone" placeholder="请输入手机号" />
    </ScFormItem>
  </ScForm>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <ScButton type="primary" @click="handleValidate">提交校验</ScButton>
    <ScButton @click="handleResetAll">重置全部</ScButton>
    <ScButton @click="handleClearAll">清理全部校验</ScButton>
    <ScButton @click="handleResetAccount">重置账号</ScButton>
    <ScButton @click="handleClearAccount">清理账号校验</ScButton>
  </div>
  <div style="font-size: 12px; color: var(--vp-c-text-2);">
    校验结果：{{ validateResult || '未触发' }}
  </div>
</template>
```

  </template>
</DemoBlock>

## 插槽用法

`label` 插槽可自定义标签；默认插槽会暴露 `validate` 方法，可手动触发当前项校验。

<DemoBlock title="自定义 label 与手动触发校验">
  <template #demo>
    <ScForm :model="slotModel" :rules="slotRules">
      <ScFormItem label="验证码" prop="code">
        <template #label="{ label }">
          <span style="color: var(--sc-color-primary);">{{ label }}</span>
        </template>
        <template #default="{ validate }">
          <div style="display: flex; gap: 8px; align-items: center;">
            <ScInput v-model="slotModel.code" placeholder="输入验证码" />
            <ScButton @click="validate('change')">校验</ScButton>
          </div>
        </template>
      </ScFormItem>
    </ScForm>
  </template>

  <template #source>

```vue
<script setup lang="ts">
import { reactive } from 'vue'

const slotModel = reactive({
  code: '',
})
const slotRules = {
  code: [
    { required: true, message: '请输入验证码', trigger: 'change' },
  ],
}
</script>

<template>
  <ScForm :model="slotModel" :rules="slotRules">
    <ScFormItem label="验证码" prop="code">
      <template #label="{ label }">
        <span style="color: var(--sc-color-primary);">{{ label }}</span>
      </template>
      <template #default="{ validate }">
        <div style="display: flex; gap: 8px; align-items: center;">
          <ScInput v-model="slotModel.code" placeholder="输入验证码" />
          <ScButton @click="validate('change')">校验</ScButton>
        </div>
      </template>
    </ScFormItem>
  </ScForm>
</template>
```

  </template>
</DemoBlock>

## Form API

### Form Attributes

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| model | Record&lt;string, any&gt; | - | 表单数据（必填） |
| rules | Record&lt;string, FormItemRule[]&gt; | - | 校验规则（必填） |

### Form Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 表单内容 |

### Form Exposes

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| validate | () => Promise&lt;any&gt; | 校验全部表单项 |
| resetFileds | (props?: string[]) => void | 重置字段值 |
| clearValidate | (props?: string[]) => void | 清理校验状态 |

## FormItem API

### FormItem Attributes

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| label | string | - | 标签文本（必填） |
| prop | string | - | 对应字段名 |

### FormItem Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 表单控件内容，暴露 `{ validate }` |
| label | 自定义 label，暴露 `{ label }` |

### FormItem Exposes

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| validateStatus | { state, errMsg, loading } | 当前校验状态 |
| validate | (trigger?: string) => Promise&lt;any&gt; | 校验当前项 |
| resetFiled | () => void | 重置当前项的值 |
| clearValidate | () => void | 清理当前项的校验状态 |

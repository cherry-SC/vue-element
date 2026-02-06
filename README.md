# sc-element

一个基于 Vue 3 的轻量组件库（学习/实践用），提供常用基础组件与少量实例方法（如 Message）。

## 安装

```sh
npm i sc-element
```

```sh
pnpm add sc-element
```

```sh
yarn add sc-element
```

## 使用

### 全量注册（推荐）

在应用入口注册组件库后，可在任意组件里直接使用 `<ScButton />` / `<sc-button />`、`<ScAlert />` / `<sc-alert />` 等组件标签。

```ts
import { createApp } from 'vue'
import App from './App.vue'

import ScElement from 'sc-element'
import 'sc-element/dist/index.css'

createApp(App).use(ScElement).mount('#app')
```

### 按需使用（单文件导入）

在 `<script setup>` 中导入后即可在模板中直接使用（建议用别名保持组件名前缀一致）。

```vue
<script setup lang="ts">
import { Alert as ScAlert, Button as ScButton, createMessage } from 'sc-element'

createMessage({ message: 'Hello', showClose: true })
</script>

<template>
  <ScButton type="primary">按钮</ScButton>
  <ScAlert title="提示" type="info" />
</template>
```

如果你只想全局注册个别组件，也可以：

```ts
import { createApp } from 'vue'
import App from './App.vue'

import { Alert, Button } from 'sc-element'
import 'sc-element/dist/index.css'

const app = createApp(App)
app.use(Button)
app.use(Alert)
app.mount('#app')
```

## 样式

组件样式统一打包为一个入口文件，建议在应用入口只引入一次：

```ts
import 'sc-element/dist/index.css'
```

## Icon（Font Awesome）

Icon 基于 `@fortawesome/vue-fontawesome`。组件库入口默认加载 Font Awesome 的 solid 图标集，因此大多数情况下不需要你在业务项目里再次 `library.add(fas)`。

## 组件与导出

全量注册后可用的组件注册名（kebab-case）：

- sc-alert
- sc-button
- sc-collapse
- sc-collapse-item
- sc-dropdown
- sc-form
- sc-form-item
- sc-icon
- sc-input
- sc-message
- sc-select
- sc-switch
- sc-tooltip

同时支持命名导出（PascalCase）与实例方法：

```ts
import {
  Alert,
  Button,
  Collapse,
  CollapseItem,
  Dropdown,
  Form,
  FormItem,
  Icon,
  Input,
  Message,
  Select,
  Switch,
  Tooltip,
  createMessage,
  closeMessageAll,
} from 'sc-element'
```
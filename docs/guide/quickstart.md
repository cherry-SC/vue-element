---
title: 快速开始
---

# 快速开始

## 安装

```bash
npm i sc-component-lib
```

## 引入样式

```ts
import 'sc-component-lib/dist/style.css'
```

## 全量注册

```ts
import { createApp } from 'vue'
import App from './App.vue'

import ScUI from 'sc-component-lib'

createApp(App).use(ScUI).mount('#app')
```

## 按需使用

```vue
<script setup lang="ts">
import { ScButton, ScAlert } from 'sc-component-lib'
</script>

<template>
  <ScButton type="primary">按钮</ScButton>
  <ScAlert title="提示" type="info" />
</template>
```


# vue-element

一个基于 Vue 3 的轻量组件库（学习/实践用）。本文档面向“使用者”，重点说明如何安装与使用各组件。

## 安装

```sh
npm i sc-component-lib
```

## 快速开始（推荐：全量注册）

在入口文件注册组件库后，就可以在任意组件里直接使用 `<sc-button />`、`<sc-alert />` 等标签。

```ts
import { createApp } from "vue";
import App from "./App.vue";

import ScUI from "your-component-lib";
import "your-component-lib/dist/style.css";

createApp(App).use(ScUI).mount("#app");
```

## 按需使用（每个文件手动导入）

如果你不想全局注册，也可以在使用处按需导入组件，然后用 `<ScButton />`（或 `<sc-button />`）。

```vue
<script setup lang="ts">
import { ScButton, ScAlert } from "your-component-lib";
</script>

<template>
  <ScButton type="primary">按钮</ScButton>
  <sc-alert title="提示" type="info" />
</template>
```

如果你的组件库没有做上述命名导出，请按你实际导出的路径导入组件；样式文件路径也以你发布产物为准（例如 `dist/style.css` / `dist/index.css` / `style.css` 等）。

## Icon/Alert 的 Font Awesome 初始化

本组件库的 Icon 基于 `@fortawesome/vue-fontawesome`。如果你使用了 `Icon` 组件，或 `Alert` 的 `showIcon`/默认关闭图标等功能，需要在项目入口初始化图标库：

```ts
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);
```

## 组件列表

- Alert 提示（注册名：sc-alert）
- Button 按钮（注册名：sc-button）
- Collapse 折叠面板（注册名：sc-collapse）
- CollapseItem 折叠项（注册名：sc-collapse-item）
- Icon 图标（注册名：sc-icon）

---

## Alert（提示）

### 基本用法

```vue
<template>
  <sc-alert title="提示标题" type="info" />
</template>
```

### Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | string | - | 标题文本（必填） |
| type | "primary" \| "success" \| "warning" \| "info" \| "danger" | "info" | 主题类型，影响颜色与默认图标 |
| effect | "light" \| "dark" | "light" | 亮色/暗色风格 |
| closable | boolean | false | 是否显示关闭按钮 |
| closeText | string | - | 关闭按钮显示自定义文字；不传则显示关闭图标 |
| showIcon | boolean | false | 是否显示左侧图标（图标会根据 type 自动选择） |
| description | string | - | 描述文本；也可使用 description 插槽替代 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 点击关闭按钮触发（仅当 closable 为 true 时可触发） | - |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| description | 自定义描述区域内容；优先级高于 description 属性 |

### 示例

```vue
<template>
  <sc-alert title="操作成功" type="success" showIcon description="数据已保存" />

  <sc-alert title="注意事项" type="warning" showIcon>
    <template #description>
      <div>这里是自定义描述内容</div>
    </template>
  </sc-alert>

  <sc-alert title="可关闭提示" type="info" closable closeText="知道了" />
</template>
```

---

## Button（按钮）

### 基本用法

```vue
<template>
  <sc-button type="primary">主要按钮</sc-button>
</template>
```

### Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | "primary" \| "danger" \| "info" \| "success" \| "warning" | - | 主题类型 |
| size | "large" \| "small" \| "medium" | - | 按钮尺寸 |
| plain | boolean | false | 是否朴素按钮（通常表现为镂空/浅色样式） |
| round | boolean | false | 是否圆角按钮 |
| circle | boolean | false | 是否圆形按钮（常用于仅图标按钮） |
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否加载中（加载中会禁用并显示 spinner 图标） |
| icon | string | - | 图标名称（传给 Icon 组件的 icon 属性） |
| nativeType | "button" \| "submit" \| "reset" | "button" | 原生 button 的 type |
| autofocus | boolean | false | 是否自动获取焦点 |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 按钮内容 |

### 示例

```vue
<template>
  <sc-button type="primary">默认</sc-button>
  <sc-button type="primary" plain>朴素</sc-button>
  <sc-button type="primary" round>圆角</sc-button>
  <sc-button type="primary" disabled>禁用</sc-button>
  <sc-button loading>加载中</sc-button>
  <sc-button icon="arrow-up">带图标</sc-button>
</template>
```

---

## Collapse（折叠面板）

### 基本用法（v-model）

`v-model` 绑定打开项的 name 数组（name 支持 string/number）。

```vue
<script setup lang="ts">
import { ref } from "vue";

const openNames = ref<(string | number)[]>(["1"]);
</script>

<template>
  <sc-collapse v-model="openNames">
    <sc-collapse-item name="1" title="标题 1">内容 1</sc-collapse-item>
    <sc-collapse-item name="2" title="标题 2">内容 2</sc-collapse-item>
  </sc-collapse>
</template>
```

### Collapse Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | (string \| number)[] | [] | 当前展开项 name 列表（配合 v-model 使用） |
| accordion | boolean | false | 手风琴模式（同一时间仅允许一个面板展开） |

### Collapse Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 展开项变化时触发（v-model 的更新事件） | (string \| number)[] |
| change | 展开项变化时触发 | (string \| number)[] |

手风琴模式下（`accordion`）建议也监听 `update:modelValue` 来同步状态；如发现状态不同步，请以组件库发布版本行为为准。

### CollapseItem Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| name | string \| number | - | 当前面板的唯一标识（建议必传） |
| title | string | - | 标题文本；不传可用 title 插槽自定义 |
| disabled | boolean | false | 是否禁用（禁用后无法展开/收起） |

### Slots

Collapse：

| 插槽名 | 说明 |
| --- | --- |
| default | 放置多个 sc-collapse-item |

CollapseItem：

| 插槽名 | 说明 |
| --- | --- |
| title | 自定义标题区域 |
| default | 面板内容 |

### 示例（手风琴 + 自定义标题）

```vue
<script setup lang="ts">
import { ref } from "vue";

const openNames = ref<(string | number)[]>(["1"]);
</script>

<template>
  <sc-collapse v-model="openNames" accordion>
    <sc-collapse-item name="1">
      <template #title>
        <h3>自定义标题 1</h3>
      </template>
      <div>内容 1</div>
    </sc-collapse-item>
    <sc-collapse-item name="2" title="标题 2" disabled>
      <div>内容 2</div>
    </sc-collapse-item>
  </sc-collapse>
</template>
```

---

## Icon（图标）

Icon 基于 `@fortawesome/vue-fontawesome` 封装：

- `type`：用于追加 `sc-icon--{type}` 类名（可配合样式做主题色）
- `color`：会设置 `style="color: ..."` 覆盖字体颜色
- 其余属性（如 `icon`、`size`、`spin` 等）会透传给 `FontAwesomeIcon`

### 基本用法

```vue
<template>
  <sc-icon icon="arrow-up" />
  <sc-icon icon="spinner" spin />
  <sc-icon icon="fa-solid fa-user-secret" color="red" />
  <sc-icon icon="circle-check" type="success" />
</template>
```

### Props（常用）

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| icon | string \| string[] \| object | - | 图标定义（必填）。如果你在入口 `library.add(fas)`，可直接使用字符串名称，如 `"arrow-up"` |
| size | "2xs" \| "xs" \| "sm" \| "lg" \| "xl" \| "2xl" \| "1x" \| "2x" \| ... | - | 尺寸 |
| spin | boolean | false | 旋转动画 |
| pulse | boolean | false | 脉冲动画 |
| type | "primary" \| "success" \| "warning" \| "danger" \| "info" | - | 主题类型（用于 class） |
| color | string | - | 颜色（用于 style） |

---
title: Message | V-Element
description: Message 组件文档
outline: deep
---

<script setup lang="ts">
import { createMessage } from '@/components/Message/method'

const open = () => {
  createMessage({
    message: 'hello message',
    type: 'success',
    showClose: true,
    duration: 3000,
  })
}
</script>

# Message 消息提示

用于全局展示操作反馈信息（以方法方式调用）。

Message 更适合“操作完成后的轻反馈”，它会浮在页面之上并自动消失；如果需要在页面中长期提示用户注意事项，更推荐使用 Alert。

## 使用场景

- 保存成功 / 删除成功等操作反馈
- 网络错误、权限不足等即时提示
- 需要在不改变布局的情况下通知用户

## 基础用法

调用 `createMessage(options)` 即可显示一条消息。

<DemoBlock title="基础用法">
  <template #demo>
    <ScButton type="primary" @click="open">打开 Message</ScButton>
  </template>

  <template #source>

```ts
import { createMessage } from '@/components/Message/method'

createMessage({
  message: 'hello message',
  type: 'success',
  showClose: true,
  duration: 3000,
})
```

  </template>
</DemoBlock>

## 进阶用法

### 手动关闭与常驻

将 `duration` 设为 `0` 表示不自动关闭（需要用户点击关闭按钮，或通过返回的实例方法手动关闭）。

```ts
import { createMessage } from '@/components/Message/method'

const instance = createMessage({
  message: '这条消息不会自动关闭',
  type: 'info',
  showClose: true,
  duration: 0,
})

instance.destory()
```

## Message API

### Message Options

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| message | string \| VNode | - | 内容 |
| type | "success" \| "danger" \| "warning" \| "info" \| "primary" | "info" | 类型 |
| duration | number | 3000 | 自动关闭时间（ms），为 0 时不自动关闭 |
| showClose | boolean | false | 是否显示关闭按钮 |

### 返回值

`createMessage` 会返回一个实例对象，用于手动关闭：

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| destory | () => void | 关闭当前消息（拼写与代码保持一致） |

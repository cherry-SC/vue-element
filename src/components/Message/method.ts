import { render, h, shallowReactive } from "vue";
import type { CreateMessageProps, MessageContext } from "./types";
import MessageConstructor from "./Message.vue";
import useZIndex from "../../hooks/useZIndex";
let seed = 1
const instances: MessageContext[] = shallowReactive([]);
export const createMessage = (props: CreateMessageProps) => {
  const { nextZIndex } = useZIndex()
  const id = `message_${seed++}`
  const container = document.createElement("div");
  const destory = () => {
    const idx = instances.findIndex((item) => item.id === id)
    if (idx === -1) return
    instances.splice(idx, 1)
    render(null, container);
  }
  const manualDestory = () => {
    const instance = instances.find((item) => item.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }
  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestroy: destory,
  }
  const vnode = h(MessageConstructor, newProps);
  render(vnode, container);
  // !非空断言运算符
  document.body.appendChild(container.firstElementChild!);
  const vm = vnode.component!
  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
    destory: manualDestory,
  }
  instances.push(instance)
  return instance
}

export const getLastInstance = () => {
  return instances[instances.length - 1]
}

export const gtetLastBottomOffset = (id: string) => {
  const idx = instances.findIndex((item) => item.id === id)
  if (idx <= 0) {
    return 0
  } else {
    const prev = instances[idx - 1]
    return prev?.vm.exposed!.bottomOffset.value
  }
}

export const closeAll = () => {
  instances.forEach(instance => {
    instance.destory()
  })
}

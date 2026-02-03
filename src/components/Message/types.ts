import type { VNode, ComponentInternalInstance } from "vue";

export interface MessageProps {
  message?: string | VNode
  type?: 'success' | 'danger' | 'warning' | 'info' | 'primary'
  duration?: number
  showClose?: boolean
  onDestroy: () => void
  id:string
  zIndex: number
  offset?: number
  transitionName?: string
}
export interface MessageContext {
  id: string
  vnode: VNode
  vm: ComponentInternalInstance
  props: MessageProps
  destory: () => void
}
export type CreateMessageProps = Omit<MessageProps, 'onDestroy' | 'id' | 'zIndex'>

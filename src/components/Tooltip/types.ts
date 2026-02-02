import type { Placement, Options } from "@popperjs/core";

export interface TooltipProps {
  content?: string
  trigger?: 'hover' | 'click'
  placement?: Placement
  manual?: boolean
  // partial 类型表示可以部分提供选项，而不是必须提供所有选项
  // 这在使用 Popper.js 时非常有用，因为它允许用户自定义 Popper.js 的行为
  // 例如，用户可以自定义 Popper.js 的偏移量、箭头位置等
  popperOptions?: Partial<Options>
  transition?: string
  openDelay?: number
  closeDelay?: number
}


export interface TooltipEmits {
  (e: 'visible-change', visible: boolean): void
}

export interface TooltipInstance {
  show: () => void
  hide: () => void
}

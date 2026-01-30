import type { PropType } from 'vue'
export type ButtonType = 'primary' | 'danger' | 'info' | 'success' | 'warning'
export type ButtonSize = 'large' | 'small' | 'medium'
export type ButtonNativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  // ? 表示可选属性
  /** 按钮类型：primary | danger | info | success | warning */
  type?: ButtonType
  /** 按钮尺寸：small | medium | large */
  size?: ButtonSize
  /** 是否朴素按钮（通常表现为镂空/浅色样式） */
  plain?: boolean
  /** 是否圆角按钮 */
  round?: boolean
  /** 是否圆形按钮（常用于仅图标按钮） */
  circle?: boolean
  /** 是否禁用状态 */
  disabled?: boolean
  /** 按钮的原生类型：button | submit | reset */
  nativeType?: ButtonNativeType
  /** 是否自动获取焦点 */
  autofocus?: boolean
}

export interface ButtonInstance {
  ref: HTMLButtonElement
}

export const buttonProps = {
  type: {
    type: String as PropType<ButtonType>,
  },
  size: {
    type: String as PropType<ButtonSize>,
  },
  plain: {
    type: Boolean,
  },
  round: {
    type: Boolean,
  },
  circle: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
  nativeType: {
    type: String as PropType<ButtonNativeType>,
  },
  autofocus: {
    type: Boolean,
  },
}

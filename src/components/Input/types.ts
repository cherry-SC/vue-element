
export interface InputProps {
  type?: string // 输入框类型（例如 text / password / textarea 等）
  size?: 'large' | 'small' // 尺寸
  disabled?: boolean // 是否禁用
  clearable?: boolean // 是否显示清空按钮
  showPassword?: boolean // 是否显示“切换密码可见”按钮（通常配合 password）
  modelValue: string // v-model 绑定值
  placeholder?: string // 占位提示文本
  readonly?: boolean // 是否只读（可聚焦但不可编辑）
  autocomplete?: string // 原生 autocomplete 属性值（例如 on/off）
  autofocus?: boolean // 是否自动聚焦
  form?: string // 关联的 form id（原生 input 属性）
}

export interface InputEmits {
  (e: 'update:modelValue', value: string): void // 输入框值变化时触发（v-model 同步更新）
  (e: 'input', value: string): void // 输入框值变化时触发（非 v-model 同步更新）
  (e: 'change', value: string): void // 输入框值变化时触发（与 input 不同，可能延迟）
  (e: 'focus', value: FocusEvent): void // 输入框获得焦点时触发
  (e: 'blur', value: FocusEvent): void // 输入框失去焦点时触发
  (e: 'clear'): void // 清空按钮点击时触发
}

export interface InputExpose {
  ref: HTMLInputElement | HTMLTextAreaElement // 输入框 DOM 引用
}

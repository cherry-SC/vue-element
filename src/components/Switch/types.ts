export type switchValueType = boolean | string | number

export interface SwitchProps {
  modelValue: switchValueType;
  disabled?: boolean;
  activeText?: string;
  inactiveText?: string;
  activeValue?: switchValueType;
  inactiveValue?: switchValueType;
  name?: string;
  id?: string;
  size?: "small" | "large";
}

export interface SwitchEmits {
  (e: 'change', value: switchValueType): void;
  (e: 'update:modelValue', value: switchValueType): void;
}

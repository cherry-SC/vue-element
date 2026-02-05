import type { InjectionKey } from "vue"
import type { RuleItem, ValidateError, ValidateFieldsError } from "async-validator"

export interface FormItemProps {
  label: string
  prop?: string
}

export interface FormItemRule extends RuleItem {
  trigger?: string
}
export type FormRules = Record<string, FormItemRule[]>

export interface FormProps {
  model: Record<string, any>
  rules: FormRules
}

export interface FormContext extends FormProps {
  addFiled: (filed: FormItemContext) => void,
  removeFiled: (filed: FormItemContext) => void,
}

export interface FormItemContext {
  prop: string
  validate: (trigger?: string) => Promise<any>,
  resetFiled(): void,
  clearValidate(): void,
}
export interface ValidateStatusProp {
  state: 'init' | 'success' | 'error';
  errMsg: string;
  loading: boolean;
}
export interface FormValidateFailure {
  errors: ValidateError[] | null,
  fields: ValidateFieldsError,
}

export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey')


export interface FromInstance {
  validate: () => Promise<any>,
  resetFileds: (props?: string[]) => void,
  clearValidate: (props?: string[]) => void,
}

export interface FormItemInstance {
  validateStatus: ValidateStatusProp;
  validate: (trigger?: string) => Promise<any>;
  resetFiled(): void;
  clearValidate(): void;
}

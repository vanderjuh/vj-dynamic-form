import { VjDynamicAbstractControlValidation } from "./vj-dynamic-abstract-control-validation.class";

export type VjDynamicAbstractControlType = 'text' | 'number' | 'textarea';
export type VjDynamicAbstractControlValidatorFn = {} | null;

export class VjDynamicAbstractControl {
  label!: string;
  placeholder?: string;
  formControlName!: string;
  type: 'text' | 'number' | 'textarea' = 'text';
  validations?: Array<VjDynamicAbstractControlValidation>
}

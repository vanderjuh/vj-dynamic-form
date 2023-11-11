import { VjDynamicAbstractControlValidation } from "./vj-dynamic-abstract-control-validation.class";

export type VjDynamicAbstractControlValidatorFn = {} | null;

export class VjDynamicAbstractControl {
  formControlName!: string;
  label?: string;
  validations?: Array<VjDynamicAbstractControlValidation>
}

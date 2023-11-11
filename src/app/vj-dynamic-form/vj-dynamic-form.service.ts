import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

import { VjDynamicAbstractControlValidation } from './classes/vj-dynamic-abstract-control-validation.class';
import { VjDynamicAbstractControl, VjDynamicAbstractControlValidatorFn } from './classes/vj-dynamic-abstract-control.class';

@Injectable()
export class VjDynamicFormService {

  private readonly labelArgumentKey = '{{label}}'

  buildControl(validations: Array<VjDynamicAbstractControlValidation>, enableDebugger = false): FormControl {
    const result = new FormControl(null, this.createAbstractControl({ formControlName: 'single', validations }));
    this.setDebbugMode(enableDebugger, result);
    return result;
  }

  buildGroup(settings: Array<VjDynamicAbstractControl>, enableDebugger = false): FormGroup {
    const generatedFormSettings = {};
    settings.forEach(c => {
      Object.defineProperty(
        generatedFormSettings,
        c.formControlName,
        {
          enumerable: true,
          writable: true,
          value: this.createAbstractControl(c)
        })
    });
    const result = new FormGroup(generatedFormSettings);

    this.setFormGroupValidator(result);

    this.setDebbugMode(enableDebugger, result);
    return result;
  }


  setFormGroupValidator(form: FormGroup): void {
    const validator = (abstractControl: AbstractControl): VjDynamicAbstractControlValidatorFn => {
      if (abstractControl instanceof FormGroup) {
        const invalid = Object.keys(abstractControl.controls).map(x => abstractControl.get(x)?.invalid).find(x => x);
        if (invalid) {
          const abstractControlErrors = Object.keys(form.controls).map((key) => {
            return { key, errors: form.get(key)?.errors }
          });
          if (abstractControlErrors.length) {
            return { errors: abstractControlErrors.filter(x => x.errors) }
          }
        }
      }
      return null;
    }
    form.addValidators(validator);
  }

  private setDebbugMode(enableDebugger: boolean, result: AbstractControl) {
    if (enableDebugger) {
      result.valueChanges.subscribe(data => {
        console.log('Form Data:', data);
        console.log('Form Definition:', result);
      });
    }
  }

  private createAbstractControl(controlSetting: VjDynamicAbstractControl): AbstractControl {
    const validations: Array<ValidatorFn> = [];
    if (controlSetting.validations?.length) {
      controlSetting.validations.forEach(fnSettings => {
        const fn = (control: AbstractControl): VjDynamicAbstractControlValidatorFn => {
          const fnResult = fnSettings.fn(control);
          if (fnResult) {
            return { [fnSettings.errorkey]: fnSettings.errorValue?.replace(this.labelArgumentKey, `"${controlSetting.label}"`) };
          }
          return null;
        }
        validations.push(fn);
      })
    }
    return new FormControl(null, validations);
  }
}

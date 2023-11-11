import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { VjDynamicFormService } from './vj-dynamic-form/vj-dynamic-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vj-dynamic-form';
  form!: FormGroup;
  formcontrol!: FormControl;

  constructor(vjDynamicFormService: VjDynamicFormService) {
    // Group
    this.form = vjDynamicFormService.buildGroup([{
      formControlName: 'firstName',
      label: 'First Name',
      validations: [{
        validatorFn: Validators.required,
        errorkey: Validators.required.name,
        errorValue: 'The {{label}} is required'
      }]
    }, {
      label: 'Age',
      formControlName: 'age',
    }, {
      label: 'Note',
      formControlName: 'note',
      validations: [{
        validatorFn: Validators.required,
        errorkey: Validators.required.name,
        errorValue: 'The {{label}} is required'
      }, {
        validatorFn: Validators.maxLength(10),
        errorkey: Validators.maxLength.name,
        errorValue: 'The {{label}} has more than 10 characteres'
      }]
    }], true);

    // Control
    this.formcontrol = vjDynamicFormService.buildControl(
      'City',
      [{
        validatorFn: Validators.required,
        errorkey: Validators.required.name,
        errorValue: 'The {{label}} is required.'
      }], true)
  }
}

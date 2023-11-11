import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { VjDynamicFormService } from './vj-dynamic-form/vj-dynamic-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vj-dynamic-form';
  form!: FormGroup;

  constructor(vjDynamicFormService: VjDynamicFormService) {
    this.form = vjDynamicFormService.buildGroup([{
      formControlName: 'firstName',
      label: 'First Name',
      validations: [{
        fn: Validators.required,
        errorkey: Validators.required.name,
        errorValue: 'The {{label}} is required'
      }]
    }, {
      formControlName: 'age',
      label: 'age',
    }, {
      formControlName: 'note',
      label: 'Note',
      validations: [{
        fn: Validators.required,
        errorkey: Validators.required.name,
        errorValue: 'The {{label}} is required'
      }, {
        fn: Validators.maxLength(10),
        errorkey: Validators.maxLength.name,
        errorValue: 'The {{label}} has more than 10 characteres'
      }]
    }], true);
  }
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VjDynamicFormService } from './vj-dynamic-form.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [VjDynamicFormService]
})
export class VjDynamicFormModule { }

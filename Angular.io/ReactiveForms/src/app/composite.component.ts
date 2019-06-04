import { Component, OnInit, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, AbstractControl, Validator } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ControlValueAccessor, FormBuilder } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NG_VALIDATORS } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'composite',
  template: `
  <div [formGroup]="addressInfo" appOnOfMany>
    <required formControlName="city"></required>
    <required formControlName="country"></required>
  </div>
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: CompositeComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: CompositeComponent },
  ]
})
export class CompositeComponent implements ControlValueAccessor, OnDestroy, Validator {

  changesSubscription: Subscription;

  addressInfo = new FormBuilder().group({
    'city': ['Olkusz'],
    'country': ['Poland']
  })

  constructor() { }

      /**
   * Passing down validation info to form
   * @param c 
   */
  validate(c: AbstractControl): { [key: string]: any; } {
    console.log('validation on composite', this.addressInfo.errors)
    return this.addressInfo.errors;
  }

  ngOnDestroy(): void {
    this.changesSubscription.unsubscribe();
  }

  writeValue(obj: any): void {
    if (obj) {
      console.log('writeValue to complex-control', obj);
      this.addressInfo.setValue(obj, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.changesSubscription = this.addressInfo.valueChanges.subscribe((x) => {
      fn(x)
      console.log('complex-control valueChanges', x);
    });
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

}

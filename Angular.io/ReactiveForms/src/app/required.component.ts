import { Component, OnInit, ViewChild, ElementRef, Self } from '@angular/core';
import { ControlValueAccessor, Validators, AbstractControl, NgControl } from '@angular/forms';
import { Validator } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'required',
  template: `
  <input [disabled]="disabled" (blur)="onTouched()" (input)="makeChange($event.target.value)" #input>
  <span *ngIf="!ngControl.control.valid">I'm invalid</span>
  `,
})
export class RequiredComponent implements ControlValueAccessor, Validator, OnInit {

  disabled: boolean;

  onTouched: () => void;

  onChange: (value: any) => void;

  @ViewChild('input')
  input: ElementRef;

  constructor(public ngControl: NgControl) {
    // This way is needed because we're injecting NgControl
    // { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: RequiredTextComponent } equivalent:
    this.ngControl.valueAccessor = this;
  }

  makeChange(val: string) {
    console.log('required onChange called', val ? val : '(no value)');
    this.onChange(val);
  }

  ngOnInit(): void {
    // This way is needed because we're injecting NgControl
    //  { provide: NG_VALIDATORS, multi: true, useExisting: RequiredTextComponent } equivalent:
    // why microtask ? To avoid dirtychecking issue
    Promise.resolve().then(() => {
      this.ngControl.control.setValidators(
        this.ngControl.control.validator ?
        [this.ngControl.control.validator, Validators.required] :
      Validators.required);
      this.ngControl.control.updateValueAndValidity();
    })
  }

  validate(c: AbstractControl): { [key: string]: any; } {
    const result = Validators.required(c);
    console.log('required Validation called', result);
    return result;
  }

  writeValue(obj: any): void {
    /*
        This method is called every time reactive forms API is used to change the value:
          this.form.controls['firstName'].setValue('Updated');
        and component should update its UI
    */
    console.log('required writeValue called', obj ? obj : '(no value)');
    this.input.nativeElement.value = obj;
  }

  registerOnChange(fn: any): void {
    // save callback and call it with new value whenever changes should be persisted to model
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

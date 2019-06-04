# Reactive Forms

Reactive forms are all about the ts code (they're also called model driven forms).

## States

- touched / untouched
- dirty / pristine
- valid / errors

These states are tracked by `FormControl` and `FormGroup`.

`FormControl` and `FormGroup` make a Form Model. Form Model is the same for Reactive Forms and Template-driven forms. It is the way how it is created that is different

## Types 

In reactive forms, everything revolves around `AbstractControl`.

`FormControl`, `FormGroup`, `FormArray` inherit from it.

Abstract control has a `value` property that gives access to all form's `FormControl`s values.

## Reactive

- import `ReactiveFormsModule`
- it gives access to `formGroup`, `formControl`, `formControlName`, `formGroupName` (only for grouping), `formArrayName` directives, which are used to bind HTML form controles to component's `FormControl` and `FormGroup`
  - `[formGroup]="customerForm"` links DOM element with `FormGroup`
  - `formControlName="firstName"` links input field to `FormControl` in the model.
- these directives are used to link form element to form model defined in component's class
- no need for `ngModel` nor `name` attributes
- no validation in template
- form model must be created manually in component class
- form model starts with root `FormGroup` e.g. `customerForm: FormGroup = new FormGroup({})`
- access to all values is provided with `formGroup.value` property

## Setting values programatically

Use `formGroup.setValue` to set whole form values or `formGroup.patchValue` to set only subset of values.

## CSS Classes

Angular adds special classes to input elements to indicate their state like `ng-invalid`.

## FormBuilder

Reduces boilerplate code needed to create form model.

### Arrays

Reactive form arrays are containers for controls (FormGroup / FormControl). 

It's a way to dynamically add / remove groups or controls to the form.

## Validation

To do validation, use `Validators` class & array syntax of `FormBuilder` class:

`customerForm = formBuilder.group({ firstName: ['Default Name', [Validators.required, Validators.minLength(3)]]})`

### Adjusting validation at runtime

use `formControl.setValidators/clearValidators` and remember to call `formControl.updateValueAndValidity`

### Custom validators

Validators are functions:

```
function myValidator(c: AbstractControl): { [key: string]: boolean } | null {}
```

Returned value is object. It's key indicates validation rule name, and value indicates if validation fails e.g:

`return { range: true }` or null if validation succeeds


### HTML 5 validation attributes

What is interesting, HTML attrs like `required` will be recognized by reactive forms, so there's no need to specify them in ts.

### Async validators

Creating async validators is as easy as:
- returning a promise from validator
- using the validator as third argument in form builders array
- checking for `pending` state of `formControl` that indicates that async validation is in progress

### Cross field validation

Eh... Don't like it. The solutions is to create a formGroup for linked formControls.

Also grouping in HTML is needed and linking with `formGroupName`. Why ? To access form group properties.

Now, custom validator will receive `AbstractControl` that will be of type form group, so we can access nested controls and do cross field validation.

## Handling user input

Form control (and FormGroup) exposes observable `valueChanges` that emits values. Another exposed observable is `statusChanges` that gives information about validation changes.

Useful operators are `debounceTime` and `distinctUntilChanged`.

```
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  term = new FormControl();

  constructor() { }

  ngOnInit() {
    this.term.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(x => this.someFnk(x)); // unsubscribes from previous observable
  }

  someFnk(arg): Observable<string> { return Observable.from(arg) };
}
```

### Hooking up to form submit event

`formGroup` adds special event `(ngSubmit)` which is raised when form is being submitted.

### `updateOn` option

Allows to specify when model values should be updated, by default on keypress.

## Creating custom form controls

### `ControlValueAccessor` interface

Implement so that form directives know how to talk to the component,

Use it with `NG_VALUE_ACCESSOR` multiprovider token.

### `Validator` interface

Implement if component should expose validation info. 

Use it with `NG_VALIDATORS` multiprovider token.

Basically it creates a validator so... You can move you validation logic to completely separate class (e.g. a directive) and have a validation reusable.

### Composite controls

This are controls that contain more than one control inside (e.g. address control, date range control).

## Resources

- https://www.youtube.com/watch?v=SdxUcZsihDE simple reactive forms with custom controls
- https://www.youtube.com/watch?v=cWZDKihoMWM & https://github.com/toddmotto/angular-pizza-creator : cool example with uptodate usage of reactive forms (probably everything you need to know)

## Template (just for completeness)

- import `FormsModule`
- gives access to ngForm, ngModel, ngModelGroup directives
- uses two-way databinding `[(ngModel)]` to keep inputs and model in sync
- validation is defined in the template
- template variables are needed to get access to form states
- each control must have name attribute
- form model is automatically generated

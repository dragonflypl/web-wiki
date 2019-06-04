import { Directive } from '@angular/core';
import { Validator, AbstractControl, FormGroup } from '@angular/forms';
import { NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appOnOfMany]',
  providers: [
    { provide: NG_VALIDATORS, multi: true, useExisting: OnOfManyDirective }
  ]
})
export class OnOfManyDirective implements Validator {

  constructor() { 
  }

    /**
   * Passing down validation info to form
   * @param c 
   */
  validate(c: AbstractControl): { [key: string]: any; } {
    return this.atLeastOneValid(c as FormGroup);
  }

    /**
   * Custom validator that requires that at least one field is required 
   * (even though lowlevel fields have their own required validation)
   * @param group 
   */
  private atLeastOneValid(group: FormGroup) {
    console.log('at least one required validation triggered')
    for(let name in group.controls) {
      if (group.controls[name].valid) {
        return null;
      }
    }
    return { atleastonerequired: true };
  }

}

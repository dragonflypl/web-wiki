import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
<form [formGroup]="formWithBuilder">
  <p>Composite: <composite formControlName="address"></composite>
  <p>Simple required: <required formControlName="firstName"></required></p>
  <p>Simple input: <input required formControlName="lastName" /></p>
  <p>Value: {{formWithBuilder.value | json}}</p>
  <p>Status: {{formWithBuilder.status | json}}</p>
  <p>Errors: {{formWithBuilder.get('address').errors | json}}</p>
</form>

<hr />

<form [formGroup]="formStandardAPI">
  <p>Composite: <composite formControlName="address"></composite>
  <p>Simple required: <required formControlName="firstName"></required></p>
  <p>Simple input: <input required formControlName="lastName" /></p>
  <p>Value: {{formStandardAPI.value | json}}</p>
  <p>Status: {{formStandardAPI.status | json}}</p>  
  <p>Errors: {{formStandardAPI.get('address').errors | json}}</p>
</form>
`
})
export class AppComponent {

  formStandardAPI = new FormGroup({
    firstName: new FormControl('Pawel'),
    lastName: new FormControl('Waszczynski'),
    address: new FormControl({
      city: 'Olkusz',
      country: 'Poland'
    })
  });

  formWithBuilder = new FormBuilder().group({
    firstName: ['Pawel'],
    lastName: ['Waszczynski'],
    address: [{
      city: 'Olkusz',
      country: 'Poland'
    }]
  });
}

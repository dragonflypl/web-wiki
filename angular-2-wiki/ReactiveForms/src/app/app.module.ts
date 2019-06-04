import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RequiredComponent } from './required.component';
import { CompositeComponent } from './composite.component';
import { OnOfManyDirective } from './on-of-many.directive';

@NgModule({
  declarations: [
    AppComponent,
    RequiredComponent,
    CompositeComponent,
    OnOfManyDirective 
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

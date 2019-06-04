# Angular 2

- https://jcoop.io/angular-2-practice-exercises/ : exercises from the course
- https://github.com/jmcooper/ng2-fundamentals : getting stared project

## Prerequisites

### Modules & Module Loaders

- modules are small JavaScript files
- only exported items can be accessed from the outside
- access to module exported items can be granted with imports

> In current WebStack this is achieved with small JavaScript files (per controller/service/component/directive).
All code is wraped in IIFE (with strict mode enabled) to prevent pollution of the global scope. However there is no explicit mechanism to specifing
 the source of the dependencies. Only DI with Angular's specifies runtime dependencies. Also global variables are available for injection into IIFE
 with window.XXX .
 
### TypeScript

A few of TypeScript features that we'll use are:

- static types

```typescript
let age:number;
let name:string
```

- interfaces

```typescript
// age is optional
interface Person {
    name: string
    age?: number 
}
```

- class properties and access modifiers

```typescript
class Person {
    private name: string
    constructor(name) {
        this.name = name;
    }
}
let p = new Person("Foo");
let name: string = p.name; // error ! 
```

- shortcut private initializers

```typescript
class Person {
    constructor(private name) {
        
    }
    
    sayHi() {
        console.log(this.name);
    }
}

let p = new Person(name);
p.sayHi();
p.name // error!
```

### Startup repository

- https://github.com/jmcooper/ng2-fundamentals
- https://github.com/angular/quickstart


# Angular 2 Concepts

## Visibility of building blocks

Angular's building blocks like services, directives, components, pipes are visible only in the module that was defines it.
Only services are visible everywhere. In order to use component in other module, this component has to be explicitly registered in other module.
This is because services are registered in root injector.

# Starting

In order to create angular app a few things are needed:
- create first component
- create first app module
- use platformBrowserDynamic to bootstrap app module
- configure SystemJS & use it to load bootstraping code

Or use ```npm install angular-cli -g``` to generate new app: ```ng new fooGui```

# Modules

|       ES6 Modules       |                    Angular Modules                    |
|:-----------------------:|:-----------------------------------------------------:|
| Imports/exports of code | Import / export set of features (components/services) |
| Promote code reuse      | Promote application / feature boundaries              |
| Organize code files     | Organize application                                  |

Modules group features.

Each angular app has at least module: `Root Angular Module`.

Additional feature modules can be created.

## forRoot

To configure module, use `forRoot` - this is similar to providers, you can configure module before it runs.

### Custom configurable module

Here's example on how to create a configurable module (http://dbarnes.me/writing-an-aot-compliant-angular-library/):

```typescript

// configurable module
export class SampleModule {  
  static forRoot(getConfig: Function): ModuleWithProviders {
    return {
      ngModule: SampleModule,
      providers: [
        { provide: 'config', useFactory: getConfig },
        SampleService
      ]
    };
  }
}

// service that is using configuration
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class SampleService {

  constructor(@Inject('config') private config: string) {
    console.log(this.config);
  }
}

// application that is using the module
export function createConfig(): string {  
  return 'Config injection successful!';
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SampleModule.forRoot(createConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 
```

## Importing

By importing module, we are granted access to exported directives/components/pipes and services. E.g. importing `HttpModule` gives access to `Http` service and importing `FormsModule` gives access to `ngModel` directive.

### `providers` array and services

If service is registered in `providers` array of a module, it will be available in whole application.

To narrow down visibility of a service, add it to `providers` array of a **`component`**.

This one I don't fully get: 

> Don't add services to providers array of shared modules. Otherwise you may end up having multiple instances of a service in the application

### Inheritance

Imports are not inherited i.e. if module B imports module C, and module A imports module B, then module A does not have access to module's C components etc, **unless** module C in exported from module B.

## Reexporting from Modules

### Modules

Modules can be exported. E.g. some shared module `A` can export `FormsModule`. Now each module that imports `A` will have access to `FormsModule` features (e.g. `ngModel`)

### Services

Never reexport services. Services registered with `providers` array are automatically registered in root application injector. So there's no point in reexporting them as they will be available anyway.

### Components/Directives/Pipes

Each component/directive/pipe MUST BE registered only in one module i.e. component can be specified in `declarations` array only once. When done, then component belongs to this module.

Components can be exported from module, using `exports` array.

# Components

Well, componets are like directives. It all starts with @Component decorator. This is the simplest component

```typescript
@Component({
    selector: 'hello-world'
    template: 'Hello {{who}}'
})
export class HelloWorld {
    who = 'World'
}
```

Components consist of class + metadata & styles & template.

Now, after registering it inside the module (mandatory in angular 2!)

```typescript
import { HelloWorld } from '...'
@NgModule({
    declarations: [HelloWorld]
})
class AppModule
```

we can use it.

## Interpolation

`{{}}` binding expressions are evaluated in the context of associated component.

## Components and modules

Component must belong to only one module.

There's two way expose a component:

- via `declarations`
- via module that is reimported (if component is already imported to other module)

## Decorator properties:

- selector
- template
- templateUrl
- styleUrls

## Lifecycle hooks

Components have lifecycle hooks and TypeScript has interfaces for them:

- `OnInit` interface has `ngOnInit` method
- `OnChanges` interface has `ngOnChanges` method. This method is executed only if one of the `@Input` properties change

## Communication with/between components

This is quick: 

- use `[]` and `@Input` to pass data to component. Only `@Input` properties can be bound using `[]` property binding.
- use `()` and `@Output` to receive data from component (component has to expose `EventEmitter`). Only `@Output` properties can be bound using `()` event binding. 

### Output

To communicate with containing world, component uses ```@Output``` decorator applied to field whose type is ```EventEmitter```.

```typescript
@Output
someAction = new EventEmitter();

function onSomeAction() {
    this.someAction.emit("event data");
}
```

and to handle it, parent component uses ```()``` binding:

```
<some-component (someAction)=handleSomeAction($event); />
```

`EventEmitter` is generic, so you can specify type : `new EventEmitter<number>()`. Emitted event is accesible via `$event` variable.

### Input

To pass information to components ```@Input``` decorator is used. Decorate component's fields with it, and use ```[]``` notation for element's attribute to pass data to components:

```typescript
import { Component, Input } from '@angular/core';

@Component({
    template: `
    <h2>{{event.name}}</h2>
    <h2>{{event.location}}</h2>`
,
    selector: 'event-thumbnail'
})
export class EventThumbnail {

    @Input()
    event: any;
}
```

and 

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'events-list',
    template: `
    <h1>Events list</h1>
    <event-thumbnail [event]=event></event-thumbnail>
    `
})
export class EventsList {
    event = {
        name: 'Angular meetup',
        location: 'Krakow'
    }
}
```

### Template variables

Template variables are a way to access child component's public members. Just add ```#<template-var-name>``` to component and access it via this name.

## Styling

Components can be styled via ```styles``` property:

```javascript
styles: [
    '.some-class { color: red }',
    '.some-other-class { color: green }'
]
```

Angular is handling SMACSS for us. It makes sure that this rules are applied only to this component.

Another way is to use `styleUrls` array to specify external files.

## Reusing components with content projection

Content projection is fancy name for Angular's 1 transclusion. Main difference is that content projection allows multiple content placeholders.

To definde placeholder, use special ```ng-content``` tag in the component. It will be populated/transcluded/projected with content of the component when it is used:

```html
<some-component>
    This will be projected
</some-component>
```

and component template:

```html
<div>
    Some Common Text
    <ng-content></ng-content>
</div>
```

To work with multiple placeholders add a ```selector``` attribute to ```ng-content``` element:

```html
<div>
    <ng-content selector="[title]"></ng-content>
    <ng-content selector="[body]"></ng-content>
</div>
```

and usage:

```html
<some-component>
    <div title>This will match first placeholder</div>
    <div body>This will match second placeholder</div>
</some-component>
```

## Directives

In Angular 2 it is still possible to create directives (e.g. attributes).

Simply use ```@Directive``` decorator, and attribute selector.

In order to reference directive's element, use ```ElementRef``` type with DI.

To simply pass a string value to a directive (or component), use plain attribute (no [] or ()) and reference it with @Input().

### @ViewChild

In order to get an `ElementRef` to any DOM element that has a ref (e.g. <div #someRef></div>), a @ViewChild decorator can be used. It takes single parameter, a name of the ref.

```typescript
class SomeComponent {
    @ViewChild('someRef')
}
```

### Custom validators

Directives can be used to create custom validators. It needs to implement `Validator` interface and override `NG_VALIDATORS` opaque token service:

```javascript
providers: [
    {
        provide: NG_VALIDATORS,
        useExisting: ValidatorComponent,
        multi: true
    }
]
```

`ValidatorComponent` is custom validator (directive) on which we define `providers`, and `multi` specifies that we add this validator to existing collection of validators.

# Pipes

In Angular 2 pipes are used only to format data (not for sorting/filterin any more). Syntax is the same:

```html
<div>
{{event.amount | currency}}
<div/>
```

## Custom pipes (aka "custom filers")

To create custom pipe use ```@Pipe``` decorator and implement ```PipeTransform``` interface. Once done, add pipe to ```declarations``` of the module.

```typescript
import { Pipe, PipeTransform} from '@angular/core';

export class SomePipe implements PipeTransform {
    transform(value: any): any {
        return typeof value;
    }
}
```

For sorting / filtering, do it on you own by watching changes (e.g. in OnChanges interface method ngOnChanges)

# New syntax

## Property / event binding

Angular 2 supports following syntax:
- interpolation: ```{{obj.name}}```
- property binding: ```<div [class]="obj.name"></div>```
- event binding: ```<div (click)="obj.doSth()"></div>```

## Safe navigation operator

Angular 2 is not forgiving when evaluating expressions that have null objects e.g. ```{{obj.name}}``` will throw error if obj is null.
In order to prevent it, explicit ```?``` operator must be used e.g. ```{{obj?.name}}```.

# Structural directives

Structural directives are prefixed with *. They modify DOM. Examples are ```*ngFor, *ngIf``` directive.

# Services

Services are regular classes. They should be decorated as ```@Injectable()``` though. Only with this decorator, other services can be injected into the current service via DI.

DI is working via constructor injection. Nothing exceptional:

```typescript
@Injectable()
class MyService {    
    constructor(otherService) {
        this.otherService = otherService;
    }
}
```

One additional step which is needed, is registering the service in module. This is done by importing the service and putting it as provider:

```typescript
import { MyService } from '...';

@NgModule({
    providers: [
        MyService
    ]
})
class SomeModule {}
```

## Registering services

- in module: if registered, services are singletons (shared across the app, in particular built-in injector holds references to services)
- in component: injectable to component and its children. If more than one component registers a service, it is no longer a singleton

# Routing

In Angular 2, components are "routable" - components are targets for the routes. 

In order to use routing import `import { RouterModule } from '@angular/router'`. This module registers router service, some components & services (`router-outlet` and `routerLink`)

Routes are defined as array of `Routes` object. Such a object has path, associated component and many other:

```typescript
import { Routes } from '@angular/router';
import { EventsList } from './events-list/events-list.component';

export const routes: Routes = [
    { path: 'events', component: EventsList },
    { path: '', redirectTo: '/events', pathMatch: 'full' }
]
```

Then routes must be imported into root component via imports and ```RouterModule.forRoot```:

```typescript
import { routes } from './routes';

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ]
})
class ...
```

and ```<router-outlet></router-outlet>``` must be put somewhere in the html to enable routing.

```typescript
@Component({
    template: '<router-outlet></router-outlet>',
    selector: 'events-app'
})
export class EventsAppComponent {

}
```

To access current route details (e.g. params), inject ```ActivatedRoute``` into component.

## Route configuration

- component
- redirectTo
- patchMatch
- path

## Creating links

Links are created with `routerLink` directive: `<div routerLink="/event"></div>`

Use array instead of string to create multiple segments of url: `<div routerLink="['/event', event.id]"></div>`

## Navigating in code

Changing routes in code is possible with ```Router``` service. Just inject it and call: `this.router.navigate('path')`

## Guards

Some guards are (interfaces from `@angular/route`):

- CanActivate interface + canActivate property of array type on routes level
- CanDeactivate
- Resolve
- CanLoad

Guard class is a service that implements this interfaces and it must be registered to root module level.

`canActivate` has `route: ActivatedRouteSnapshot` param that can be used to determine guard logic.

## Routes resolves

Just like in Angular 1 / UI Router it is possible to resolve data during routing phase. Do it with router's resolve property and resolver service that implements ```Resolve```:

```typescript
import { Resolve } from '@angular/router';
import { EventsService } from '../events.service';

export class EventsResolver implements Resolve<any> {
    resolve() {
        return new EventsService().getEvent();
    }
}
```

and

```typescript
export const routes: Routes = [
    { 
        path: 'events', 
        component: EventsList, 
        resolve: {
            event: EventsResolver
        }
    }
]
```

## Route params (Routing to the same compoent)

`ActivatedRoute`'s `snapshot.params` contains initial parameters of the route. Use it, if params will not change.

When params of route change (but active component does not change), existing components do not get reinitialized. They stay... So we need to listen to route params changes. 

Route params are observales so observe `this.route.params.forEach(x: Params => x[paramName]);`, where this.route is of type `ActivatedRoute`.

# Http

## Service & module

Use 

`import { HttpModule } from '@angular/http'` in `imports: [ HttpModule ]` 

and then just use 

`import { Http } from '@angular/http'`. 

By default it returns observables. In order to work with them use

```
import { Observable } from 'rxjs/Observable'; // import type
import { of } from 'rxjs/observable/of' // import of function
import 'rxjs/add/operator/delay; //import operator
import 'rxjs/add/operator/do; //import operator
import 'rxjs/add/operator/toPromise; //import operator
import 'rxjs/add/operator/catch; //import operator
import 'rxjs/add/observable/throw; //import operator
```

Easiest way is to simply call its methods with url with promises 

```
this.http.get(this.url).toPromise().then(response => { return response.json().data as number[] }):
```

or with rxjs

```
this.http.get(this.url).map(response => { return response.json().data as number[] }):
```

## Error handling 

With promise, this is easy, just use `catch` of second callback of `then`.

With observables use `catch` and `throw` operator

```
this.http.get(this.url).catch(error => Observable.throw('Some message'));
```

## Fake backend

`angular-in-memory-web-api` provides a way to have a in memory web api.

# Forms

Similarly, there's a ```ngModel``` and ```ngSubmit``` directive. 

For two way binding use ```[(ngModel)]``` (if e.g. model has initial value), otherwise use one-way ```(ngModel)```.

Name attribute is mandatory for form fields.

To access form in *template-based form*, use ```#<var-name>```
```
<form #eventForm="ngForm" (ngSubmit)="save(eventForm.value)">
</form>

```

ngForm refers to form component (I guess);

## Reactive forms

Cool name, and that's it? Basically it means that in component we create ```FormGroup``` and ```FormControl``` objects and link them to form & form controls on the page.
This is done via ```[formGroup]=formGroupObj``` attriute on the form and ```formControlName=nameOfTheControl``` attribute on control elements. And code in component:

```typescript
let formGroup = new FormGroup({
    firstName: new FormControl(initialFirstName),
    lastName: new FormControl(initialLastName)
});
```

To group form controls, use ```<div ngModelGroup=propertyName>...</div>```. This will bind all form controls inside to grouping object.

#### Validation

To set up validation, pass validator (or array) to FormControl constructor: ```new FormControl(initValue, [Validator.required, Validator.pattern('A-Z')])```.

Accessing it is similar to Angular 1 with error proerty ```formControl.error.required```.

To summarize, with reactive forms you're required to do stuff that Angular 1 does automatically, it created ngFormController & ngModelController on scope. Now you have to do it yourself. Benefit is that now you're able to test forms without compiling the component.

# Dependency Injection

Injector creates dependencies using providers.

Provider is a recipe that knows how to create dependency.

Type annotations in TypeScript can be used to ask for dependencies.

Every components has its own injector, resulting in an injector tree

Providers can be created at `@NgModule`, `@Component` and `@Directive` levels.

### Behind the scenes

```typescript
var injector = ReflectiveInjector.resolveAndCreate([
  Car,
  Engine,
  Tires,
  Doors
]);
```

Each element of the array is a provider. This is shorthand syntax, but can be expanded to:

```
var injector = RelfectiveInjector.resolveAndCreate([
  { provide: Car, useClass: Car },
  { provide: Engine, useClass: Engine },
  { provide: Tires, useClass: Tires },
  { provide: Doors, useClass: Doors }
]);
```

`provide` value is called token. E.g. we can map token to different class:

```
{ provide: Engine, useClass: OtherEngine }
```

Recipies can be complex:

```
{ 
  provide: Engine,
  useFactory: () => {
    if (IS_V8) {
      return new V8Engine();
    } else {
      return new V6Engine();
    }
  }
}
```

or factory function (each time dependency is requested, new instance is created)

```
{ 
  provide: Engine,
  useFactory: () => {
    return () => {
      return new Engine();
    }
  }
}
```

Also injectors have parent child relationship


```
var injector = ReflectiveInjector.resolveAndCreate([Engine]);
var childInjector = injector.resolveAndCreateChild([Engine]);

injector.get(Engine) !== childInjector.get(Engine);
```


If token is not found on child injector, it will be serched for in the parent (this is used in `@Components`, each component has its own injector).

Angular uses this approach to inject:

```
class Car {
  constructor(
    @Inject(Engine) engine,
    @Inject(Tires) tires,
    @Inject(Doors) doors
  ) {
    ...
  }
}
```

which can be simplified if we use TypeScript:

```
class Car {
  constructor(engine: Engine, tires: Tires, doors: Doors) {
    ...
  }
}
```

### Angular 1.x Issues

- internal cache: dependencies are served as singletons
- naming colisions
- DI built into the framework


### Resources

- https://blog.thoughtram.io/angular/2015/05/18/dependency-injection-in-angular-2.html


DI works similar to Angular 1 way. 

This is done via ```Providers``` of module:

## Provider

What is a provider? 

> A provider describes what the injector should instantiate a given token, so it describes how an object for a certain token is created.

Have different types of providers:

- Class Provider (useClass)
- FactoryProvider (useFactory)
- Aliased Class Provider (useExisting)
- Value Provider (useValue)

```
deps?: Object[],
multi?: boolean
```

options are used to provide dependencies (for useFactory) and enable collection support for the same token:

```
bootstrap(AppComponent, [
   provide('languages', {useValue: 'en', multi:true }),
   provide('languages', {useValue: 'es', multi:true })
])
```

The Injector is a service that keeps track of the injectable components by maintaining a registry and injects them when needed.

The registry is a map that associates keys (called tokens) with classes. 

``` javascript
@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [
        EventsAppComponent, 
        EventsList,
        EventThumbnail
    ],
    providers: [
        EventsService,
        EventsResolver
    ],
    bootstrap: [EventsAppComponent]
})
export class AppModule {}
```

This is shorthand syntax. You just use type (class), and Angular is later hijicking TypeScript type in other components that want to use the service. 

If type of the parameter in component's constructor matches the one in ```providers```, then it is injected.

Another way to declare injectable provider is long syntax:

``` javascript
    providers: [
        { provider: EventsService, useClass: EventsService }, // === EventsService
        { provider: 'canDeactivate', useValue: deactivateChecker },
        { provider: 'canDeactivate', useFactory: someFactory },
    ],
```

it means that is someone requests a ```canDeactivate``` value, a function ```deactivateChecker``` will be injected. This is useful in route guards.

Of course ```@Injectable``` is needed if we need to inject other service into our service. 

`useFactory` can be used to dynamically switch implementations depending on the configuration / enviornment:

```
import {HTTP_PROVIDERS} from 'angular2/http'
// ...
const IS_PROD = true;
bootstrap(AppComponent, [
   HTTP_PROVIDERS, 
   //we provide a factory
   provide(CarService, {
       useFactory: http => IS_PROD ? 
               new FakeCarService() : new CarService(http),
       deps: [Http]
    })
]);
```

## OpaqueToken / InjectionToken

Sometimes we need to use some global object like ```toastr``` in DI system. 

Because Angular uses types to do DI, one way to do it, is to create a wrapper proxy class like ```ToastrService``` that delegates all calls to ```toastr```. That could be ok for small API. However doing it with jQuery etc would be overkill.

Solution is to use ```OpaqueToken``` and ```@Inject``` to register and inject a global e.g.

```typescript
// somewhere in token service file
export TOASTR_TOKEN = new OpaqueToken("toastr")

providers: [
    {
        provide: TOASTR_TOKEN,
        useValue: window['toastr']
    }
]

// some components constructor
constructor(@Inject(TOASTR_TOKEN) toastr: any)
```

### But OpaqueToken & InjectionToken are more than that

They really expose a way to define a service at runtime...

They define a token that can be used to register anything under the token. This token is (has to be) widely known / used.

Tokens are used for items that are not classes and need to be injected (primitives, interfaces, globals etc...). 

Interfaces are worth nothing. Let's imagine we have a library that has interface that specifies API endpoints it should point to. This interface has no implementation, but library exposes a token. This token can be used to register a implementation of this class.


## Asynchornous Angular

### ES6 Promise

Angular will work with ES6 `Promise`:

```
new Promise((resolve, reject) => {
  resolve("Resolved");
  reject("Rejected");
})
```

TypeScript also gives access to generic type `Promise<T>`.

### Observables

Another way to work in async way it to use `Observable<T>` from

```
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

const example: Observable<number[]> = of([1,2,3]);
```

# Others

## Visibility of Angular's ngModule building blocks

- providers are shared (global)
- imports are not shared
- declarations (components) are not shared

Angular 2 does not have ng-show/ng-hide, instead it uses property binding to show/hide elements e.g. ```<div [hidden]="obj.sth" />```

There're two ways to apply classes/styles to elements:

- class binding syntax ```<div [class.nameOfTheClass]='booleanExpression' />```. This will add class of given name if expression is truthy
- [ngClass] directive. As value, this can take an object / function that returns object or array of classes or comma separated list of classes

Applying styles is analogous (ngStyle directive or style binding syntax / Style binding), https://angular.io/docs/ts/latest/guide/template-syntax.html : 

```
<comp [style.width.px]='someProperty'></comp>
```

## Barells 

Importing exported stuff from different files can become a pain. This is why, it's possible to create so called barells. 
This is index.ts file that reexports all items from the folder. Later this one index can be imported and only used items can be used in import syntax:

```typescript
export * from './file1'
export * from './file2'
export * from './file3'
export * from './file4'
```

and 

```typescript
import { FileOneComponent, FileTwoComponent } from './files/index'
```

## Freaky features

### Server side rendering

- https://github.com/angular/universal , for java backend it should be ready with Angular 4.1

### Relative paths in templates

I'm not sure if it applies to WebPack and Angular CLI, but if for @Component there's a templateUrl specified, by default it is absolute path. In order to make it relative use:

```
@Component({
  moduleId: module.id
})
```

module.id is variable that is available, and it holds the absolute url of the component class module file.

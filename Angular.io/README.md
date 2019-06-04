# angular-2-wiki

----

# Angular 2


## Styling components & View encapsulation 

So... components should be reusable and sharable - thus all stuff related to component (javascript, template, css) should be bundled together, breaking a bit separation of concerns principle.

Styles can be put inline in template or in external resources or using component inline styles (last two done via `styles` array of the `@Component`.

Angular takes these styles, extracts them and appends them to `head`.

Angular supports three view encapsulation strategies: emulated / native / no emulation (that's all folks!), configurable via:

`encapsulation: ViewEncapsulation.*`of `@Component` decorator.

## Testing

- still using Jasmine
- still using Karma

Isolated tests:

- services / pipes
- components / directives without template
- components are created manually

Integrated tests:

- classes & templates
- components / directives constructed by framework
- complex
- deep (test parent/child interaction) & shallow (single component)

Needed tools:

- karma, karma-chrome-launcher, karma-jasmine, jasmine-core, @types/jasmine

In order to use Karma with Angular 2 , use `karma-test-shim.js`

### Supporting tools / Advanced stuff

- use Host Components to test components like your users would use it
  - https://netbasal.com/testing-dumb-components-in-angular-ba90a97a7129

- https://github.com/NetanelBasal/ngx-easy-test reduces boilerplace code needed to write tests with / without host components. This article explains it: https://netbasal.com/angular-tests-made-easy-with-ngx-easy-test-7b8b75d8a47d
- https://github.com/youdz/dry-angular-testing & https://www.youtube.com/watch?v=9hrPqWETPao - video that shows some advanced topics on testing (related to ngx-easy-test):
  - how to prevent memory leaks: use `fixture.destroy` / `fixture.nativeElement.remove` in `afterEach`
  - speed up testing (remove `compileComponents`)
  - extract common initialization test code into other files and extend `this` that is available in the context of tests
  - how to take advantage of Jasmine's context object (use function, not fat arrow)

## Change detection

> https://blog.angularindepth.com/these-5-articles-will-make-you-an-angular-change-detection-expert-ed530d28930
> 
> An Angular 2 application is a reactive system, with change detection being the core of it.

What that is mean **reactive**?

- Angular 2 has components based architecture
- Angular 2 application is a tree of components. This tree (change detection graph) is **directed** and may not have cycles

![https://cdn-images-1.medium.com/max/800/0*7Q98xHzNuTqoz9Uo.png](https://cdn-images-1.medium.com/max/800/0*7Q98xHzNuTqoz9Uo.png)

### How it works

How Angular knows when to trigger change detection?

- JavaScript runtime environment is overridable. You can change everything (even change the value of `undefined`)
- Angular patches several low level APIs (e.g. addEventListener)
- patching is done via `Zone.js`
- no `$digest` & `$apply`

### Advanced OnPush 

Angular's default change detection is compatible with direct object mutation. OnPush is different.

In reality OnPush strategy does change detection in three cases:

- when any of its input properties change (e.g. new object was created)
- when component fires an event
- when observable input fires event

#### OnPush and object mutations

When `OnPush` detector is used, and input object is mutated, detector will not run.

#### OnPush and new objects as inputs

Change detector will run when input bindings will be changed by reference (new object) 

#### OnPush and event handlers

Raising any event from within component will also trigger change detector

#### OnPush with observable objects as inputs

Because we're passing observable object as input, its reference will always be the same.

Even though reference is still the same, and seemingly change detector should not be triggered, it actually will. 

This is because Angular will trigger detector on every event emitted by the observable inputs.

#### OnPush with services and observables

If we do not pass input data as @Input, instead use services and expose observables and subscribe to them manually, then change detector will not run.

To fix this, `| async' must be used in template on the observable e.g.

`<fieldset class="newsletter" *ngIf="userService.user$ | async as user else loading">`

### Change detector

> https://blog.angularindepth.com/the-mechanics-of-dom-updates-in-angular-3b2970d5c03d -advanced: how change detection code looks like and how it does DOM updates. Under the hood Angular represents an application as a tree of views (aka components, but view is low-level abstraction). Basically what is commonly known as Change Detector / ChangeDetectorRef is a **View**

Every components has a change detector (view) responsible for checking the bindings defined in its template.

Change detector can be in one of many states e.g.: FirstCheck, ChecksEnabled.
By default all change detectors are in state ChecksEnabled, unless OnPush is used.
States can be manipulated with `ChangeDetectorRef` methods:
- detach
- reattach
- markForCheck - important, this guy only marks all changedetectors from root to current for change detection when next change detection happens, it does not run change detection immediately. Basically this method makes most sense only on `ngDoCheck` handler when you manually track changes and you want the current component to be checked in current change detection run 

> more on https://blog.angularindepth.com/if-you-think-ngdocheck-means-your-component-is-being-checked-read-this-article-36ce63a3f3e5

```
Checking A component:
  - update B input bindings
  - call NgDoCheck on the B component
  - update DOM interpolations for component A
 if (bindings changed or B called markForCheck) -> checking B component:
    - update C input bindings
    - call NgDoCheck on the C component
    - update DOM interpolations for component B
 
   Checking C component:
      - update DOM interpolations for component C
```

- detectChanges - this actually forces change detection for current component + children

> https://blog.angularindepth.com/everything-you-need-to-know-about-change-detection-in-angular-8006c51d206f comprehensive guide. Explains step by step what is going on during change detection. Additionally: https://stackoverflow.com/questions/41364386/whats-the-difference-between-markforcheck-and-detectchanges/45396740 (look for angularindepth answer, other is crap)

Few facts:
- ngDoCheck is called always (remark: always, but only for components that parent's changedetection is enabled, that is first component that has onpush strategy and it does not have changes/ will not call it's childer ngDoCheck)
- OnChanges is called only if input properties were changed. onChanges lifecycle hook is triggered on a child component before the child view is checked and it will be triggered **even if changed detection for the child view will be skipped** (e.g. change detector is detached).
- DOM for a view is updated as part of a change detection mechanism while the view being checked. This means that if a component is not checked  (e.g. change detector is detached) , the DOM is not updated even if component properties used in a template change. 

Change detector is created at application startup time (**this code is static**). What is in this code: for each expression found in the template, change detector is comparing current value of the property used in expression with the previous value. 

> TLDR; **Only** expressions found in template are compared. 

**Bottom line**: Angular change detection works by checking if the value of template expressions have changed. Angular does not do deep object comparsion, **only** properties used in the template.

By default JavaScript objects are mutable: by default Angular does support mutating objects. I.e. component input properties can be mutated and it will work out of the box. So it is not necessary to create new object every time its state changes. However, reference comparison of input properties can be enabled (covered later in immutable objects section) by customizing change detection.

Change detection is done for all components. Change detection is propagated from root to leaves (directed tree of components).

![https://cdn-images-1.medium.com/max/800/0*4Y6oSUUSw-DdNq_V.png](https://cdn-images-1.medium.com/max/800/0*4Y6oSUUSw-DdNq_V.png)

This makes the change detection significantly faster & predictable & easier to debug. 

How faster?

- by default change detection goes through every node in components tree on every event and checks all bindings
 - seems inefficient
 - in reality: hundreds of thousands of simple checks in a few miliseconds (do to internal implementation details of change detectors, i.e. they are static (?))

Why faster:

- there's no loop like in digest cycle: changes propagate only once down the tree (uni-directional data flow)
- change detector is static & component specific (not generic) and generated on application startup & does comparison only of expressions in bindings
  - generic code (looping, checking all properties) could not be eaisly optimized by the browser's JIT
  - specific code (accessing properties explicitly) can be optimized and - this is why Angular's 2 change detection is much more performant. It is also predictable and simple to read.
- Input bindings & immutability of objects & observables
  - Certain kind of values can be immutable (we may know by design) or be observable objects
  - If so, then Angular will take advantage of this knowledge and optimize change detection (check parts of the tree only if they really change). This is useful when we run into performance corner cases

Advanced: the trik why change detection is blazing fast it... code generation. All field checks for dirty checking are **monomorhpic** (JIT can do optimizations, it's 10x faster).

> http://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html

What is important: disabling change detection for component (e.g. by calling detach on change detector ref) will cause skipping change detecton for all its child components.

#### Unidirectional data flow

> No component lower in hierarchy is allowed to update properties of a parent component after parent changes have been processed. 
> 
Two-way data-binding VS unidirectional data flow
Unidirectional data flow as a pattern is usually mentioned when talking about performance differences between AngularJS and Angular. This is what makes Angular much faster than its predecessor.

So the unidirectional data flow defines the architecture of **bindings updates** that are processed **during change detection.**

Angular performs and additional verification loop in development mode that can result in `expressionchangedafterithasbeencheckederror`. So fix it:
- do model changes in async way (like Promise.resolve().then(...) or setTimeout)
- force additional change detection with `detectChanges()` call
- **best** : redesign the solution


> More here: https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4 It describes the order of relevant operations in change detection phase

#### Change detection development mode

Development mode spots situation when our code would cause change detection loop (for instance evaluation of expression is causing change in another expression in another component).

In development mode, Angular runs change detection twice - second time just to check if nothing was changed.

#### Disabling / enabling change detection

Change detector object can be injected into components using `ChangeDetectorRef` type. Calling its `detach` method disables change detection for the component. Calling `detectChanges` triggers manual detection. Detaching change detector (and triggering detection manually with `changeDetectorRef.detectChanges()`) can significalny improve performance.

> https://blog.thoughtram.io/angular/2017/02/02/making-your-angular-app-fast.html#detach-change-detectors-from-change-detector-tree

#### Immutable objects

- If component depends **only on its input properties** and **they are immutable**, the component can change only if one of its input properties changes
- component's subtree can be skipped in change detection, until input property changes (reference)

**Bottom line**: change detection on subtrees of components won't run:

![https://cdn-images-1.medium.com/max/800/0*37eSkEi-XS9s86fG.png](https://cdn-images-1.medium.com/max/800/0*37eSkEi-XS9s86fG.png)

> It is worth noting that a component can still have private mutable state as long as it changes only due to inputs being updated or an event being fired from within the component’s template. The only thing the OnPush strategy disallows is depending on shared mutable state.

Implemented with:

```
@Component({changeDetection:ChangeDetectionStrategy.OnPush}) 
```

##### Additional complexity

- necessary to remember to always create new objects
- Immutable.js can help

#### Obseravble objects

This is interesting: if all component input properties are observable objects, then this component can change only if one of its input properties emits an event. Therefore, **this component's** subtree can be skipped in change detection process until such an event occurs.

**This can give significant boot in performance**.

Assuming that changes happen rarely and the components form a balanced tree, **using observables changes the complexity of change detection from O(N) to O(logN)**, where N is the number of bindings in the system

## Links

### Done

- https://blog.thoughtram.io/angular/2015/06/25/styling-angular-2-components.html
- https://blog.thoughtram.io/angular/2015/06/29/shadow-dom-strategies-in-angular2.html
- https://vsavkin.com/change-detection-in-angular-2-4f216b855d4c
- http://blog.angular-university.io/how-does-angular-2-change-detection-really-work/
- http://blog.angular-university.io/onpush-change-detection-how-it-works/

### In progress


 
### TODO

- https://vsavkin.com/immutability-vs-encapsulation-90549ab74487
- https://vsavkin.com/angular-2-template-syntax-5f2ee9f13c6a

- https://facebook.github.io/immutable-js/
- https://angular-university.io/home

----

## Zone.js

Long time ago in Angular 1.x we had this magic methods `apply/digest`....

Let’s first think about what actually causes this change in our applications. Or rather, what can change state in our applications. Application state change is caused by three things:
- Events - User events like click, change, input, submit, …
- XMLHttpRequests - E.g. when fetching data from a remote service
- Timers - setTimeout(), setInterval(), because JavaScript

It turns out that these three things have something in common. Can you name it? … Correct! They are all asynchronous.

### How this is related with Angular

It turns out that, the problem that Zones solve, plays very nicely with what Angular needs in order to perform change detection in our applications. 

When Anguar app starts, code is run in Angular zone. This zone tells Angular when async operations complete.

Zones can be created by forking. Forking zone created new that inherits from paret zone (prototypal inheritance).

Zone allows to detect VM turns.

`zone.js` and NgZone is used by Angular to automatically trigger change detection as a result of async operations. Angular can be configured to use `noop` zone, and by doing that async operations will not trigger change detection. When this is the case, `ApplicationRef`'s `tick` method must be called manually.

`NgZone` has two methods `run` and `runOutsideAngular`.  Just remember, in order to avoid change detection whole task callback should run outside angular zone i.e. if you call code that is in event handler outside angular zone, this is to late, because event handler entered angular's zone and it will trigger change detection:

This will trigger change detection anyway **(bad)**:
```
  trackMousePosition(event: MouseEvent) {
    this.zone.runOutsideAngular(() => { // (mousemove)="trackMousePosition($event)
      this.x = event.clientX;
      this.y = event.clientY;
    })
  }
```

This will work (no change detection is triggered, **good**):
```
  constructor(private zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      document.addEventListener("mousemove", this.trackMousePosition.bind(this));
    })
  }

  trackMousePosition(event: MouseEvent) {
    this.x = event.clientX;
    this.y = event.clientY;
  }
```

More here: https://blog.thoughtram.io/angular/2017/02/21/using-zones-in-angular-for-better-performance.html

 NgZone comes with an API runOutsideAngular() **which performs a given task in NgZone’s parent zone**, which does not emit an onMicrotaskEmpty event, hence no change detection is performed.
 
> https://blog.thoughtram.io/angular/2016/02/01/zones-in-angular-2.html#running-code-outside-angulars-zone
 
Use latter to run performance heavy operations outside Angular zone to avoid constantly triggering change detection.

### What are macro & microtasks

https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/

Microtasks are executed at the end of callback OR after task is finished.

VM turn is (probbly, IMHO) when task is finished.

### What is a zone

A zone is nothing more that an execution context that survives multiple JavaScript VM execution turns.

### Supported API

- all browser events (click, mouseover, keyup)
- setTimeout/setInterval
- Ajax requests
- other

- https://www.youtube.com/watch?v=3IqtmUscE_U&t=1s
- https://www.youtube.com/watch?v=V9Bbp6Hh2YE - cool introduction to zonejs and even how it works under the hood
- https://blog.angularindepth.com/i-reverse-engineered-zones-zone-js-and-here-is-what-ive-found-1f48dc87659b - indepth explanation of zone.js internals, what/when events are triggered
- https://blog.angularindepth.com/do-you-still-think-that-ngzone-zone-js-is-required-for-change-detection-in-angular-16f7a575afef - how zone.js and NgZone work together in context of change detection

### Usage

- error handling
- long stack trace
- counting tasks (e.g. click the button that spinns up many async tasks, and you wanna know when everything is done)
- profiling (https://blog.thoughtram.io/angular/2016/01/22/understanding-zones.html + https://github.com/angular/zone.js/tree/master/example), e.g. count real time that async actions took 
- TODO: write spinner SpinnerZone :)

## Simple Binding

### Template variables

In Angular it's posible to create a template variable to refer to the element. Use `#{variable-name}` to create a variable, e.g.:

`<select #country (change)="countryChange(country.value)">...</select>` 

### Property binding

Use `[]` to bind properties: `<img [src]="url" />` will bind `src` attribute to component's `url` field.

Angular supports some special bindings, e.g. for styles: `<label [style.color]="color">Text</label>`

### Event binding

Use `()` to bind to events: `<button (click)="someAction()">Click Me</button>`.

Accesing data in event handlers can be done via template variables or `$event` variable:

`<select #country (change)="countryChange(country.value)">...</select>` 

or 

`<select (change)="countryChange($event.target.value)">...</select>` 

## Two-way binding

### ngModel

To use it `[(ngModel)]="prop"` import `FormsModule` from `@angular/forms`.

Also `[ngModel]="prop" (ngModelChange)="prop=$event.target.value"``

# Advanced stuff

- https://netbasal.com/using-angular-components-with-third-party-libraries-522a1f33003 : how to create & obtain component instance dynamically at runtime + how to integrate angular components with third party libs (`ComponentFactoryResolver`, `Injector`)

## Creating components library

- https://www.youtube.com/watch?v=1IO5qGN4jpo - cool video that shows usage of cool tool: http://spektrakel.de/ng-packagr . Awesome stuff
- https://www.youtube.com/watch?v=tZZ8EQnX2cE - what you need to know when building components library like:
  - package.json properties for different bundling systems
  - package angular modules
  - enable types (intellisense) (compiler option `declarations`)
  - making platform independent (`Renderer2`)
  - making form enabled controls (`ControlValueAccessor`)
  - making library AOT enabled with `ngc` and custom tsconfig & metadata json
  - Some stuff seems like some stuff is outdated though and can be done with ng-packagr

More stuff in separate readme: https://github.com/dragonflypl/angular-2-wiki/blob/master/aot-and-compiler.md

## Writing platform independent components

http://blog.mgechev.com/2017/01/21/distributing-an-angular-library-aot-ngc-types/ - this is basic intro

## Angular CDK

- https://www.youtube.com/watch?v=kYDLlfpTLEA : demo of using overlay
- https://www.youtube.com/watch?v=yTcVtGddGHs example of data tables + other components (mostly angular material stuff)

### CDK features

- https://www.youtube.com/watch?v=OhUHVLuD78o : full series
  - portal & portalhost: API to components into containers
  - overlay: to position stuff (e.g. tooltips) relative to others
  - cdk table: API for customizable table
  - stepper
  - accesibility
  - layout module: breakpoints etc.

# Resources

- https://angular.io/resources
- UI Resources
  - http://ng-lightning.github.io/ng-lightning/#/components
  - https://vmware.github.io/clarity/

# Debugging Angular 2+

- http://rangle.github.io/batarangle-io/

# Comparsion / Benchmarks

- https://www.pluralsight.com/guides/front-end-javascript/react-vs-angular-2
- https://www.beyondjava.net/blog/ui-roundup-2017-angular-vs-react/
- https://hackernoon.com/angular-vs-react-the-deal-breaker-7d76c04496bc

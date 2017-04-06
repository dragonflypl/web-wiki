# Controllers / directives

## Before Angular 1.5

- controllers & directive created with module API (```module.controller``` / ```module.directive```)

## Angular 1.5

```module.component``` - new type of abstraction around directives / enhanced controller

- easy to create like controller
- still gives a subset of power features that directives have

## Creating components

Some convention:
- `<componentName>.component.[js|html]` - file names for js & markup
- `camelCase` component name in `module.component` becomes a `snake-case` in HTML
- `template` or `templateUrl`

- enforce using `controllerAs` syntax
 - any data put on the controller object will be available for binding in the view.
 - by default, controller is available via `{{$ctrl}}` in the template. This can be changed with `controllerAs`. 
 
 ## New Lifecycle Hooks
 
 http://blog.thoughtram.io/angularjs/2016/03/29/exploring-angular-1.5-lifecycle-hooks.html
 
- `$onInit`: mimics an initialization function (to model initialization). Called after controller instance is created and when all bindings are initialized. Awesome for testing.
- `$onDestroy` - called when assiciated scope is destroyed e.g. navigating to new route / DOM node removed
- `$onChanges(changesObj)` - called when **input (one-way)** bindings change. Use this callback clone the bound value to prevent accidental mutation of the outer value
- `$doCheck` - called on each digest cycle iteration. Provides opportunity to do any kind of checks, especially these that do not trigger `$onChanges` , e.g. properties of input binding has changed / deep comparsion
- `$postLink` - low level work against DOM - rarely used with components. As for DOM stuff rather regular attribute directives are used. Any DOM related manipulations can be done using `$element` via DI.

 ## Old controller vs component?
 
 - with 1.5, controller already can have a template assigned in definition. No need for a route to pair controller with a template
 
 ## Old directives vs components?
 
 - always use isolate scope / always create custom element
 - component is not as powerful as directive, but most of the time we don't even use features that are missing (like compile function)
 - components provide defaults (like controllerAs, always use isolated scope, always use custom element)
 - linking model values to outside world is no longer done via isolated scope syntax, instead ```bindings``` property of component is used
 - `bindings` allow for: `>` one-way binding, `=` two way binding, `@` reading attribues and `&` method binding

### One way vs two way binding

Why one way binding:

- performance: two-way binding sets up an additional watch on the value to detect changes on the value (e.g. new object is created) and notify the parent and opposite.
- uni-directional data flow (React!) and explicit statement that parent owns the data. If something should change, raise an event (`&` binding).
 
 ## Unit Testing 
 
 - with directives - no way to access controller (unless controller was explicitly registered)
 - Use ```$componentController``` service from `ngMock` module to instanciate components
 -- second argument allows to manually inject dependencies
 -- third argument allows to provide bindings (eases up the testing vs compared to directives)

 # Composition with components / Communication between components
 
 - one approach: components communicate via Bindings. Components are decoubled here
 - second approach: Tight coupled components - via require (just like directives) . Components that work together. Required components (their controllers) are easily accessible via controller's properties. E.g.:

```
require: {
  "parent": "^accordion"
}
...
controller: function() {
  this.parent...
}
```

### One-way binding

One way binding works of object identity. That means, if binding is on object, then assigning new value to an object won't be reflected in the parent. However, modification of object's properties, will be propagated to the parent (as the same object reference is used)

Caveats: one-way binding set's up a watch on object's identity. That means that watches are fired only when reference to the value has changed in the parent.

**By default: always use one-way inding!**

## Components characteristics

- components always use isolated scope
- component should never modify data & DOM outside of their scope
- never modify / change one-way bound item inside the component
- bindings are required by default. To make it optional use `?` , e.g. `<?`
- define inputs via `<`, outputs `&`


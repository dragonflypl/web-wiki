# Controllers / directives

## Before Angular 1.5

- controllers & directive created with module API (```module.controller``` / ```module.directive```)

## Angular 1.5

```module.component``` - new type of abstraction
-- easy to create like controller
-- can have all powerful features of directive

## Creating components

- enforce using ```controllerAs``` syntax:
 - any data put on the controller object will be available for binding in the view.
 - by default, controller is available via ```{{$ctrl}}``` in the template. This can be changed with ```controllerAs```. 
 
 ## New Lifecycle Hooks
 
 http://blog.thoughtram.io/angularjs/2016/03/29/exploring-angular-1.5-lifecycle-hooks.html
 
 - $onInit: mimics a constructor / initialization function (to model initialization)
 - $onDestroy
 - $onChanges
 - $postLink

 ## Old controller vs component?
 - with 1.5, controller already can have a template assigned in definition. No need for a route to pair controller with a template
 
 ## Old directives vs components?
 - component is not as powerful as directive, but most of the time we don't even use features that are missing (like compile function)
 - components provide defaults (like controllerAs, always use isolated scope, always use custom element)
 - linking model values to outside world is no longer done via isolated scope syntax, instead ```bindings``` property of component is used
 - bindings allow for: '>' one-way binding, '=' two way binding, '@' reading attribues and '&' method binding
 
 ## Unit Testing 
 
 - Use ```$componentController``` service to instanciate components
 
 # Composition with components
 
 - one approach: components communicate via Bindings. Components are decoubled here
 - second approach: Tight coupled components

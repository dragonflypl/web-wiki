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

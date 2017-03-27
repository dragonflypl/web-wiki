# Scopes

Scopes:
- is a glue between controller and view (data use to render the view)
- represents application model
- are a context for expressions (e.g. `{{someExpression()}`}. Expressions are evaluated on the scopes.
- arranged in a hierarchy (child / isolated scopes)

# Phases

## Linking

- watchers are set for found expressions by the directives

## Hierarchy

Scope inheritance is `prototypal`. It means that when expression is evaluated, it is first evaluated on current nodes scope. If not found, it goes down the inheritance chain.

> git checkout 02-app-controller-inheritance

> Hint: to access currently accessed element, use `$0` variable in console. To retrieve associated scope use `angular.element($0).scope()` or `angular.element($0).isolateScope()`

`angular.element($0).scope().id` evaluated on child node, returns `AppController`.

Also: 

``` javascript
angular.element($0).scope().__proto__ == angular.element($0).scope().$parent
```

prove that we're dealing with prototypal inheritance.

TODO: 

- $watch - observe model mutations
- $apply - propagate model changes if done outside of angular world

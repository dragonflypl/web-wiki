# Scopes

Scopes:
- is a glue between controller and view (data use to render the view)
- represents application model
- are a context for expressions (e.g. `{{someExpression()}`}. Expressions are evaluated on the scopes.
- arranged in a hierarchy (child / isolated scopes)

# Phases

## Linking

Watchers are set for found expressions by the directives. During template linking, directives register watches on the scope. This watches are used to propagate model values to the DOM.

> Hint, `ng-bind` code: https://github.com/angular/angular.js/blob/master/src/ng/directive/ngBind.js#L3

> git checkout 03-watcher-execution

## Hierarchy

Scope inheritance is `prototypal`. It means that when expression is evaluated, it is first evaluated on current nodes scope. If not found, it goes down the inheritance chain.

> git checkout 02-app-controller-inheritance

> Hint: to access currently accessed element, use `$0` variable in console. To retrieve associated scope use `angular.element($0).scope()` or `angular.element($0).isolateScope()`. Both functions are available only when `debugInfoEnabled()` is true.

`angular.element($0).scope().id` evaluated on child node, returns `AppController`.

Also: 

``` javascript
angular.element($0).scope().__proto__ == angular.element($0).scope().$parent
```

prove that we're dealing with prototypal inheritance.

### $rootScope

Each application has single `$rootScope`. Each scope (child/isolated) has a reference to `$rootScope`

## $apply & $digest & $watch

All changes to the model (scope) must be done inside Angular's execution context (i.e. digest cycle must be triggered).

To enter this context, `$apply` method can be used:

> Angular's code: https://github.com/angular/angular.js/blob/master/src/ng/directive/ngEventDirs.js#L3

`$apply` is just a helper method that calls `$rootScope.$digest` after client's code runs (at the end of $apply). 

It's important to notice, that it calls `$digest` on `$rootScope`. That means that **all watchers (watchExpressions) will be called on each digest cycle loop iteration**!

Having this in mind remember: **dirty checking function must be efficient and fast**.

In `$digest` scopes examine all of the `$watch` expressions and compare them with the previous value. It's called `dirty checking`. If current value is different from previous, `$watch` listener is executed.

`$digest` is repeated untill there're no changes (`$watch`'ers do no detect any changes)

> git checkout 04-num-digest-loops + show window.watchers

![image](https://cloud.githubusercontent.com/assets/5444220/24399818/5a5a7986-13ae-11e7-8793-d11516a1b477.png)

`Dirty checking` is done anynchronously - not immediately - when call stack becomes empty.

If `$watch` causes changes of the value of the model, it will force additional `$digest` cycle.

Let's see how it looks in dev tools:

![image](https://cloud.githubusercontent.com/assets/5444220/24363701/e441ca80-1310-11e7-8a03-e46bce4b8518.png)

![image](https://cloud.githubusercontent.com/assets/5444220/24396463/943e97aa-13a3-11e7-8c5c-096c96e995eb.png)

### $evalAsync

This is addition to the `$digest` cycle. In reality, apart from `$watch` list, Angular is storing additional queue: `$evalAsync` queue. This is useful when we need to execute some code asynchronously i.e. at the beginning of next digest cycle. Putting something into this queue will enforce additional digest iteration.

> git checkout 05-eval-async

### $watch strategies

- by reference (good) using `!==`
- by value (bad) using `angular.copy` (creates deep copy) - can have memory / performance implications
- watching collection content (ugly, but needed sometimes)

# TODO: 
- show example : watching by reference with directive (how & when watchers are called)
- $digest
- $broadcast & $emit
- $watch - observe model mutations
- $apply - propagate model changes if done outside of angular world
- 

# TODO-DONE
- https://docs.angularjs.org/guide/scope

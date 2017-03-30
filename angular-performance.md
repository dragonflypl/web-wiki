# Tools

- https://github.com/mrdoob/stats.js/
- AngularJS Batarang
- AngularJS Inspector
- ng-inspector for AngularJS
- Angular watchers
- console.time API along with Chrome Timeline & Profiler!

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

`$apply` is just a helper/wrapper method that calls `$rootScope.$digest` after client's code runs (at the end of $apply). A digest cycle starts with `$scope.$digest()` call.

``` javascript 
function $apply(expr) {
  try {
    return $eval(expr);
  } catch (e) {
    $exceptionHandler(e);
  } finally {
    $root.$digest();
  }
}
```

It's important to notice, that it calls `$digest` on `$rootScope`. That means that **all watchers (watchExpressions) will be called on each digest cycle loop iteration**!

> Angular directives / services automatically call $digest (e.g. ng-click, $timeout)

Having this in mind remember: **dirty checking function must be efficient and fast**.

What if a listener function itself changed a scope model?

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

This is addition to the `$digest` cycle. In reality, apart from `$watch` list, Angular is storing additional queue: `$evalAsync` queue. This is useful when we need to execute some code asynchronously i.e. at the beginning of next digest cycle loop. Putting something into this queue will enforce additional digest iteration.

Also use `$applyAsync` to queue async code that will be run before next `$digest` cycle.

> git checkout 05-eval-async

### $watch strategies

- by reference (good) using `!==` (angular's default)
- by value (bad) using `angular.copy` (creates deep copy) - can have memory / performance implications 
- watching collection content (ugly, but needed sometimes) with `$watchCollection`. Notifies about changes in collection (add/removal/replacement)

Also there's helper `$watchGroup`.

> git checkout 06-watch-strategies-strict-non-strict

# Hints

Watches are set on:

- $scope.$watch
- {{ }} type bindings
- Most directives (i.e. ng-show)
- Scope variables scope: { bar: '='}
- Filters {{ value | myFilter }}
- ng-repeat

Watchers (digest cycle) run on:

- User action (ng-click etc). Most built in directives will call $scope.apply upon completion which triggers the digest cycle.
- ng-change
- ng-model
- $http events (so all ajax calls)
- $q promises resolved
- $timeout
- $interval
- Manual call to $scope.apply and $scope.digest

How to improve performance:

- disable ngAnimate globally / enable is explicitly with `$animateProvider.classNameFilter`: https://www.bennadel.com/blog/2935-enable-animations-explicitly-for-a-performance-boost-in-angularjs.htm
- use classList
- use angular components and one way binding (read about it and explain)
- defered interpolation (my favourite): (https://www.bennadel.com/blog/2704-deferring-attribute-interpolation-in-angularjs-for-better-performance.htm)
- use event delegation
- delayed transclusion: ng-if / switch are cool as they delay linking of a DOM elements (as a result, delay watchers creation)
- useCache factory
- use WeakMap / WeakSet
- More DOM manipulation in Directives (swich classes in onclick event, without watchers) link function
- clean after yourself in $destroy ($watach,$on,$timeout)
- throttle / debounce mouse events
- use digest instead of apply
- make sure onetime binding is "stable"
- use applyAsync (group many async operations into one digest)
- unbind watchers
- do not use angulars directives for mouse events
- avoid using filters if at all possible. They are run twice per digest cycle, once when anything changes, and another time to collect further changes
- disable debug data! (debugInfoEnabled)
- debounce ng-model
- use one time binding (::)
- use track by (by default is uses `$watchCollection` and reference identity) in ngRepeat
- don't use filters for sorting!
- reduce number of watchers :)
- make manual watchers lightning fast
- don't use deep watch `$watch`
- switch from deep watch to `$watchCollection`
- if deep watch must be used, watch only subset of data (`_.map`)
- use ng-if in favour of ng-show/hide
- virtualize ngRepeat
- use native JavaScript & lodash

# Hands on performance

> git checkout 10-performance-data-seed


# TODO: 

- amazing example of using profiler ! https://www.bennadel.com/blog/2635-looking-at-how-scope-evalasync-affects-performance-in-angularjs-directives.htm
- use empty ng-repeat, show that it creates watchers
- https://docs.google.com/document/d/1K-mKOqiUiSjgZTEscBLjtjd6E67oiK8H2ztOiq5tigk/pub
- do filters affect number of watchers ? how one time binding works with filters ? 
- httpprovider useApplyAsync
- show example : watching by reference with directive (how & when watchers are called)
- $digest
- $broadcast & $emit
- $watch - observe model mutations
- $apply - propagate model changes if done outside of angular world
- CRUCIAL: https://github.com/bahmutov/code-snippets


measure idle digets cycle loop time:
``` javascript
angular.element(document.querySelector('[ng-app]')).injector().invoke(function($rootScope) { 
  var a = performance.now(); 
  $rootScope.$apply(); 
  console.log(performance.now()-a); 
})
```

# TODO-DONE


- https://www.binpress.com/tutorial/speeding-up-angular-js-with-simple-optimizations/135
- https://www.qualtrics.com/eng/tuning-angularjs-performance/
- https://www.airpair.com/angularjs/posts/angularjs-performance-large-applications
- https://www.stackchief.com/blog/Understanding%20Watchers%20in%20AngularJS
- https://www.alexkras.com/11-tips-to-improve-angularjs-performance/
- http://www.codelord.net/2014/06/17/angular-performance-101-slides/
- filtering to achieve sorting? how bad is it.
- https://www.sitepoint.com/understanding-angulars-apply-digest/
- https://docs.angularjs.org/guide/scope
- https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$watch
- https://www.bennadel.com
  - https://www.bennadel.com/blog/2566-scope-watch-vs-watchcollection-in-angularjs.htm
  - https://www.bennadel.com/blog/2557-defer-dom-tree-binding-in-angularjs-with-delayed-transclusion.htm - useless
  - https://www.bennadel.com/blog/2751-scope-applyasync-vs-scope-evalasync-in-angularjs-1-3.htm
  - https://www.bennadel.com/blog/2605-scope-evalasync-vs-timeout-in-angularjs.htm

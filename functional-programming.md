## Articles

- [Simple Made Easy](https://www.infoq.com/presentations/Simple-Made-Easy) video:
  - Simplicity is prerequisite for relability. By Rich Hickey, the author of Clojure. Watch it from time to time...
- [Fear, trust and JavaScript: When types and functional programming fail](https://www.reaktor.com/blog/fear-trust-and-javascript/)
  - Consider learning PureScript / ReasonML / Elm / ClojureScript - FUCK!
  - [Fear, trust and PureScript: Building on trust with types and functional programming](https://www.reaktor.com/blog/fear-trust-and-purescript) : PureScript and Programming without the fear.
- [Functional Redux Reducers with Ramda](https://alligator.io/redux/functional-redux-reducers-with-ramda/) - fantastic example of using Ramda to create redux reducers.

## Immutability

### Immer

- [Immutable Data with Immer and React setState](https://codedaily.io/screencasts/86/Immutable-Data-with-Immer-and-React-setState)
- [Immutability in React and Redux: The Complete Guide](https://daveceddia.com/react-redux-immutability-guide/)
- [The Rise of Immer in React](https://www.netlify.com/blog/2018/09/12/the-rise-of-immer-in-react/) - why Immer? On it's fundamentals and aligmnemt with React's philosophy
-  The big advantage of Immer, is that you don’t have to learn (nor load) an entire new library for your data structures. Immer operates on normal JavaScript objects and arrays
- [Introducing Immer: Immutability the easy way](https://hackernoon.com/introducing-immer-immutability-the-easy-way-9d73d8f71cb3) - how immer works + code snippets from author
- https://medium.com/workday-engineering/workday-prism-analytics-the-search-for-a-strongly-typed-immutable-state-a09f6768b2b5 - pure theory. How `Immer` compares to `Immutable.js` and hot it is better.

Compare:

```
const byId = (state, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          obj[product.id] = product
          return obj
        }, {})
      }
    default:      
      return state
  }
}
```

to:

```js
const byId = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RECEIVE_PRODUCTS:
        action.products.forEach(product => {
          draft[product.id] = product
        })
        break
    }
  })
```

or 

```js
// ImmutableJS
const newMap = map.updateIn(['inMap', 'inList'], list => list.push(4))

// Immer
draft.inMap.inList.push(4)
```

#### Currying and Redux reducers

```js
const byId = produce((draft, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      action.products.forEach(product => {
        draft[product.id] = product
      })
      break
  }
})
```

## FP API

> https://egghead.io/courses/functional-programming-in-javascript-with-ramda-js is great

- `R.__` - placeholder LOL
- `R.indexBy` - creates an lookup from objects collection by a property
- `R.flip` - wraps the function and reverses order of params. Useful with e.g. merge and inside redux reducers.
- `R.tap` - for debugging etc.
- `R.ascend/descend` - create comparer for object's property
- `R.sort/sortWith/sortBy` - different sorting options. Work nicely with `R.ascend/descend`
- `R.invoker` - invokes method on an object
- `R.uniq` - returns unique items from collection. Similar are `R.uniqBy` and `R.uniqWith`
- `R.constructN/construct` - wraps constructor function inside curried function
- `R.allPass` - accepts multiple predicates that all must be satisfied to return true. `R.anyPass` is similar (only one predicate must return true)
- `R.chain` - this is `flatMap` - it maps over the collection and calls the function and then concats the result
- `R.propSatisfies` - can be used to create declarative conditions that prop must satisfy
- `R.where` - to create if statements with multiple conditions, used with `equals/lt/gt`
- `R.equals/lt/gt` - for copmarsion of arguments
- `R.T` - returns true
- `R.ifElse/when/unless/cond` - executes functions based on first function (predicate) return value
- `R.propEq` - returns predicate that checks for prop equality, used commonly with `ifElse/when/unless`
- `R.propOr` - get property value from object or return default value - this is a getter. Version without default value is `R.prop`
- `R.assoc` - set prop on object (of course return new instance by cloning) - this is a setter
- `R.lensProp` - creates lens with getter and setter (`prop` and `assoc`) for a prop created automatically
- `R.lens` - create a lest (getter/setter created manually). `R.view\set` is used to use lens
- `R.over` - apply function on item via lens
- `R.compose` - compose functions, passing params right to left. `R.pipe` goes left to right
- `R.converge` - pass multiple params into first function from array of transformation functions
- `R.useWith` - similar to `R.converge`. It passed arguments down to array of transformation functions.
- `R.identity` - returns what was passed to it
- `R.tail` - removes 1st element from collection and returns rest
- `R.split` - splits by character
- `R.fromPairs` - creates an object from list of tuples (array with two elements) where first item is key and second is value. Opposite is `R.toPairs`
- `R.pick` - picks properties from object. `R.pickBy/pickAll` are variants. `R.omit` is opposite.
- `R.project`- map + pick 
- `R.pluck` - picks single named prop from functor items (similar to `pick`). This is equal to `map` + `prop`
- `R.filter/reject/partition` - for filtering based on predicate. `partition` creates two groups for `false` and `true`.
- `R.curry/curryN/uncurry/uncurryN` - for curring and uncurring
- `R.evolve` - perform a transformation of the object. Each transformation is defined via `prop:fn` 
- `R.tryCatch` - as name suggests
- `R.always` - always returns the same value, used e.g. with `R.tryCatch`
- `R.unfold` - builds a list from a seed value
- `R.zip` - merges two collections by matching index. Commonly used with `fromPairs`
- `R.merge` - just like Object.assign / `...` operator. Merges two objects.
- `R.zipObj` - is equal to `pipe(zip, fromPairs)`


## Other

> What is monad

A monad is a type with a bind function and a toMonad function. The bind function goes mechanically from monad to monad without explicitly unveiling a monad's pertinent value.

> What is functional programming

https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0

Functional programming (often abbreviated FP) is the process of building software by composing pure functions, avoiding shared state, mutable data, and side-effects. Functional programming is declarative rather than imperative, and application state flows through pure functions.

Functional programming favors:

- Pure functions instead of shared state & side effects
- Immutability over mutable data
- Function composition over imperative flow control
- Lots of generic, reusable utilities that use higher order functions to act on many data types instead of methods that only operate on their colocated data
- Declarative rather than imperative code (what to do, rather than how to do it)
- Expressions over statements
- Containers & higher order functions over ad-hoc polymorphism

> Immutability

An immutable object is an object that can’t be modified after it’s created. Conversely, a mutable object is any object which can be modified after it’s created.

Immutability is a central concept of functional programming because without it, the data flow in your program is lossy.

> What is a pure function

A pure function is a function which:

- Given the same input, will always return the same output.
- Produces no side effects (which means that it can’t alter any external state, does not alter arguments - like arrays, objects etc)

With impure functions, it’s impossible to fully understand what a function does unless you know the entire history of every variable that the function uses or affects.

A side effect is any application state change that is observable outside the called function other than its return value. Side effects include:

- Modifying any external variable or object property (e.g., a global variable, or a variable in the parent function scope chain)
- Logging to the console
- Writing to the screen
- Writing to a file
- Writing to the network
- Triggering any external process
- Calling any other functions with side-effects

> What is high order function

A higher order function is a function that takes a function as an argument, or returns a function. Higher order function is in contrast to first order functions, which don’t take a function as an argument or return a function as output.

https://medium.com/javascript-scene/higher-order-functions-composing-software-5365cf2cbe99

Example: array.map

> What is a closure

A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

> Two use cases for closure

- Data privacy
- Partial application & curring
  - Currying and partial application are two ways of transforming a function into another function with a generally smaller arity.
  - Currying means breaking a function with many arguments into a series of functions that each take one argument and ultimately produce the same result as the original function.

> What is function composition

https://medium.com/javascript-scene/master-the-javascript-interview-what-is-function-composition-20dfb109a1a0

Function composition is the process of combining two or more functions to produce a new function. Composing functions together is like snapping together a series of pipes for our data to flow through.

Use it with lodash flowRight or pipe (yes rxjs uses function composition)

```
const curry = fn => (...args) => fn.bind(null, ...args);

const map = curry((fn, arr) => arr.map(fn));

const join = curry((str, arr) => arr.join(str));

const toLowerCase = str => str.toLowerCase();

const split = curry((splitOn, str) => str.split(splitOn));

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const toSlug = pipe(
  split(' '),
  map(toLowerCase),
  join('-'),
  encodeURIComponent
);

console.log(toSlug('Hello World')); // 'hello-world'
```

## Curring

Technique where we can separate the arity from the function, so that we can write functions that take a lot of arguments, but give them only one argument at a time.

Separate arity from function: this is what curring does.

If function is curried, you can create completely new function that has some of the arguments already baked in:

```javascript
import { curryRight, get, split } from 'lodash'
const getProp = curryRight(get, 'some.nested.prop', 2);
const obj = { ... }
getProp(obj); // this will translate to call get(obj, 'some.nested.prop')

const words = curryRight(split, ' ', 2);
words('a b c'); // this returns [a, b, c] , just like split('a b c', ' ')
```

A curried function always returns another function with an arity of 1 until all of the arguments have been applied.

```javascript
const array = [1, 2, 3, 4];
const op = x => x * 2;

// curried style
const double = require('lodash/fp/map')(op);
console.log(double(array));

// not curried
const map = require('lodash/map');
console.log(map(array, op));
```

## Resources

- <https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8> : curry vs partial application

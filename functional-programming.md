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

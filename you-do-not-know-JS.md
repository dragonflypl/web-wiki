# You don't know JS

```javascript
const curry = (
  f, arr = []
) => (...args) => (
  a => a.length === f.length ?
    f(...a) :
    curry(f, a)
)([...arr, ...args]);
```

> The true constant is change. Mutation hides change. Hidden change manifests chaos. Therefore, the wise embrace history.

> Program to an interface, not an implementation.

> Favor object composition over **class** inheritance.

## [10 Interview Questions Every JavaScript Developer Should Know](https://medium.com/javascript-scene/10-interview-questions-every-javascript-developer-should-know-6fa6bdf5ad95)

- (1) Can you name two programming paradigms important for JavaScript app developers?: OOP and FP
  - Worth to remember: “new considered harmful,” “inheritance considered harmful,” and “super is a code smell.”
  - [The Two Pillars of JavaScript Part 1 — Prototypal OO](https://medium.com/javascript-scene/the-two-pillars-of-javascript-ee6f3281e7f3) article (about new considered harmful, factories, drawbacks of classical inheritance, benefits of prototypal inheritance)
    - [Classical Inheritance is Obsolete - How to Think in Prototypal OO](https://vimeo.com/69255635) video
    - <https://stampit.js.org/> and <https://github.com/stampit-org/stampit> - create objects from reusable, composable behaviors. Supports three different kinds of prototypal inheritance (delegation, concatenation, and functional)
    - <https://www.html5rocks.com/en/tutorials/speed/static-mem-pools/> + <https://www.youtube.com/watch?v=RWmzxyMf2cE> - Static Memory Javascript with Object Pools
    - <https://www.youtube.com/watch?v=3WgVHE5Augc> - new considered harmful
  - [The Two Pillars of JavaScript — Pt 2: Functional Programming](https://medium.com/javascript-scene/the-two-pillars-of-javascript-pt-2-functional-programming-a63aa53a41a4)
    - [A General Theory of Reactivity](https://github.com/kriskowal/gtor) + [Video](https://www.youtube.com/watch?v=2p51PE1MZ8U)
    - [Learn RxJS](http://reactivex.io/learnrx/) - interactive learning of Reactive Extensions because the key to learning Rx is training yourself to use functional programming to manipulate collections
    - RxJs, http://highlandjs.org/ , Bacon.js - some Rx libraries
    - Laziness - means that streams / collections are processed one by one from the stream and functions start to execute only once somebody is interested in result (like subscription to an observable)
    - [RxJs and FP at Netflix](https://www.youtube.com/watch?v=gawmdhCNy-A)
- (2) What is functional programming?
  - **The essence of software development is composition.**
  - [Composing Software by Eric Elliott](https://medium.com/javascript-scene/composing-software-the-book-f31c77fc3ddc)
    - Promote Function Composition and Object Composition (Favor object composition over class inheritance)
    - [Functors & Categories](https://medium.com/javascript-scene/functors-categories-61e031bac53f)
    - [Abstraction & Composition](https://medium.com/javascript-scene/abstraction-composition-cb2849d5bdd6)
    - [Curry and Function Composition](https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983)
      - Use Data last functions i.e. specialized arguments should be first in function signature, and data should be last argument e.g. `map(fn, data)` and not `map(data, fn)`.
      - [How point-free composition will make you a better functional programmer](https://medium.freecodecamp.org/how-point-free-composition-will-make-you-a-better-functional-programmer-33dcb910303a)
      - Point-free style: Point-free style is a style of programming where function definitions do not make reference to the function’s arguments. A point-free function by definition doesn’t use the function keyword or the => symbol.
    - [Higher Order Functions (Composing Software)](https://medium.com/javascript-scene/higher-order-functions-composing-software-5365cf2cbe99)
    - [A Functional Programmer’s Introduction to JavaScript (Composing Software)](https://medium.com/javascript-scene/a-functional-programmers-introduction-to-javascript-composing-software-d670d14ede30) - don't read, too easy
    - [Master the JavaScript Interview: What is a Pure Function?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976)
    - [Master the JavaScript Interview: What is Function Composition?
Go to the profile of Eric Elliott](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-function-composition-20dfb109a1a0)
      - Use `flow` / `compose` from `lodash` and use **points-free style**
    - [Master the JavaScript Interview: Soft Skills](https://medium.com/javascript-scene/master-the-javascript-interview-soft-skills-a8a5fb02c466)
    - [Master the JavaScript Interview: What is a Promise?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)
      - Amazing Promise spec in a nutshell
    - [Master the JavaScript Interview: What is Functional Programming?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0)
      - Imperative vs Declarative: imperative is about statements and flow control (if, for, while), while declarative is about expressions and data flow and it abstracts away flow control
      - A higher order function is any function which takes a function as an argument, returns a function, or both
      - Side Effects: is an application state change that is visible outside of the called function, other then return value. For side effects, use **monads**
      - Immutable data structures: In many functional programming languages, there are special immutable data structures called trie data structures. Tries use structural sharing to share reference memory locations for all the parts of the object which are unchanged after an object has been copied by an operator, which uses less memory, and enables significant performance improvements for some kinds of operations.
    - [Master the JavaScript Interview: What’s the Difference Between Class & Prototypal Inheritance?](https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9)
    - [Master the JavaScript Interview: What is a Closure?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36)
      - A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In JavaScript, closures are created every time a function is created, at function creation time.
      - Closures are frequently used in JavaScript for object data privacy, in event handlers and callback functions, and in partial applications, currying, and other functional programming patterns. Closures can also be used to create stateful functions .
  
  
 ## TODO
 
 - <https://davidwalsh.name/javascript-objects> - another artile that criticizes classical inheritance
 - [Video](https://www.youtube.com/watch?v=2p51PE1MZ8U) - A General Theory of Reactivity , watch again
 - [Learn RxJS](http://reactivex.io/learnrx/) - interactive learning of Reactive Extensions because the key to learning Rx is training yourself to use functional programming to manipulate collections

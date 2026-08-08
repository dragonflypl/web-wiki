# Rx JS

Let's start with example, that proves that everything can be an observable:

`c = a + b`

```
const a$ = new Observable<number>();
const b$ = new Observable<number>();
const c$ = a$.combineLatest(b$, (a, b) => a + b);
c$.subscribe(doSomething);
```

> RxJs is for working with Observables, which are push based-sets @benlesh

> Reactive programming is programming with asynchronous data streams. A stream is a sequence of ongoing events ordered in time. It can emit three different things: a value (of some type), an error, or a "completed" signal. The "listening" to the stream is called subscribing. Listening is done by "observers".

> An observable is a set of any number of things over any amount of time

API for async programming with observable stream.

Observable stream? It's like an array, but populated over time. RxJs knows when new data in the array arrives.

First there must be code that will wait for something to happen, and then react to this something.

In JavaScript we're always waiting for something:
)

- UI events
- AJAX request
- Timers/Intervals

`Observable` is main abstraction.

RxJs is just an implementation of ReactiveX for JavaScript. The same API in other languages.

> Remeber : observables don't do nothing until you subscribe to them

## Example (drag&drop)

This is example that shows power of observables:

```
const target = ...
const md = Observable.fromEvent(target, 'mousedown');
const mm = Observable.fromEvent(document, 'mousemove');
const mu = Observable.fromEvent(document, 'mouseup');
md.switchMap(() => mm.takeUntil(mu));.subscribe(...)
```

## Observables

> Observable is just a function (that takes an observer)

```
function timerObservable(observer: any) {
  let counter = 0;
  const id = setInterval(() => {
    if (counter === 10) {
      observer.complete();
    }
    observer.next(counter++);
  }, 100)
  return () => clearInterval(id);
}
timerObservable({ next: function() {}, complete: function() {}, error: function() {}});
```

So why class? Just to wrap the function and enable some OOP features (dot chaining, typing)

```
class GomObservable {
  subscribe;

  constructor(observableFnk) {
    this.subscribe = observableFnk
  }

  map(mapFnk) {
    return new GomObservable(observer => {
      return this.subscribe({
        next: function (v) { observer.next(mapFnk(v)) }
      })
    })
  }
}

const obs = new GomObservable(function (observer: any) {
  let counter = 0;
  const id = setInterval(() => {
    if (counter === 10) {
      observer.complete();
    }
    observer.next(counter++);
  }, 100)
  return () => clearInterval(id);
}).map(x => x * 2);

obs.subscribe({ next: function () { }, complete: function () { }, error: function () { } })
```

> Operator is just a function that takes an observable and returns an observable

```
class MyObservable {
  subscribe: any;
  constructor(observableFnk) {
    this.subscribe = observableFnk;
  }
  someOperator(someFnk) {
    return new MyObservable((observer) => {
      return this.subscribe({
        next(x) {
          console.log('someOperatorIsWorking');
          observer.next(someFnk(x));
        },
        complete() {
          console.log('someOperatorIsWorking');
          observer.complete();
        }
      });
    });
  }
}

function intervalObservable(observer) {
  let i = 0;
  const id = setInterval(() => {
    observer.next(i++);
    if (i === 10) {
      observer.complete();
    }
  }, 100);

  return () => {
    console.log('Unsubscribing');
    clearInterval(id);
  }
}
```

> Taken from 14:00 - he creates simple manual observable and operator: https://www.youtube.com/watch?v=3LKMwkuK0ZE

- `Observable<T>` from `import { Observable } from 'rxjs/Observable'`

### Features

- are lazy: nothing is done until subscribe is called
- are extended via operators. What is operator? This is function on observable that returns new observable.
- subscription to observable subscribet to `source` observable

### Creating observables

- custom observable

```
const someObs$ = new Observable(observer => {
	observer.next(1);
	observer.complete();
})
// Note ! Function in the constructor won't be called untill subscription happens
someObs$.subscribe(nextHandler, errorHandle, completeHandler);
```

- from static data:

```
const array = [1, 2, 3, 4, 5];
const observable = Observable.from(array);
observable.filter(x => x % 2 === 0).subscribe(x => { console.log(x); }, null, () => console.log('Completed'));
```

As there's nothing asynchronous about this operation, it is the same as we're using `lodash` or Javascript Array API etc.

- from stream of data, as it arrives

```
const observable = Observable.interval(1000)

observable.filter(x => x % 2 === 0).subscribe(x => {
  console.log(x);
}, null, () => console.log('Completed'));
```

- manually with `Observable.create(observer => { ... })` and control what, how, when is emited by the observable

This is really low level solution, usually you do not need it. Use helper functions like `fromEvent`

- errors :) One can create an observable that will emit an error: `Observable.throw(new Error("Ups!"))`

### Inheriting from Observable

This is usually bad idea (this is complex). However there are sometimes legitimate cases like doing logging (i.e. inject custom behaviour throughout the whole chain of operators)

```ts
class LogSubscriber extends Rx.Subscriber {
  next(value) {
    console.log('next ' + value);
    this._next(value);
  }

  error(e) {
    console.log('error ' + e);
    this._error(e);
  }

  complete() {
    console.log('complete');
    this._complete();
  }
}

class LogOperator {
  constructor(childOperator) {
    this.childOperator = childOperator;
  }

  call(subscriber, source) {
    return this.childOperator.call(
      new LogSubscriber(subscriber), source
    );
  }
}

class LogObservable extends Rx.Observable {
  lift(operator) {
    const observable = new LogObservable();
    observable.source = this;
    observable.operator = new LogOperator(operator);
    return observable;
  }
}

// --1--2--3|
// const observable = Rx.Observable.interval(100)
//   .map(x => x+1)
//   .take(3);

const observable = new LogObservable((observer) => {
  setTimeout(() => {observer.next(1)}, 100);
  setTimeout(() => {observer.next(2)}, 200);
  setTimeout(() => {observer.next(3)}, 300);
  setTimeout(() => {observer.complete()}, 400);
});

observable
  .map(x => 10 * x) // LogObservable
  .filter(x => x > 15) // LogObservable
  .count() // LogObservable
  .subscribe(x => { alert(x); });
}
```

### Subscribing to stream of data

Subscription expects and observer: object with methods `next`, `complete`, `error`:

```
class ObserverImpl implements Observer<number> {
  next(value) {
    console.log(value);
  }

  error(err) {
    console.log(err);
  }

  complete() {
    console.log('Completed')
  }
}

const observable = Observable.interval(100)

observable.filter(x => x % 2 === 0).take(5).subscribe(new ObserverImpl());
```

But subscribe is overloaded, so it can take functions.

**NOT EVERY OBSERVABLE COMPLETES**

### Short lived observable

This is typical in HTTP requests (observable that emits one value):

```
this.contacts = this.contactsService.getContacts();
```

## Handling errors

- one way is to have error handler. With this approach sequence "exits"
- in order to continue processing on error use `Observable.onErrorResumeNext`
- `catch` operator that will receive error, and that operator can return another `Observable` that will be used to continue.

## Processing events

`Observable.fromEvent(document, 'mousemove')` - example

## Operators

An operator is just an observable. What distinguishes operators from other observables? Operators are observables that, as the name suggests, operate on a source observable.

> http://reactivex.io/documentation/operators.html - check out decision tree to pick right operator

Observables allow to modify sets of events with operators.

Operators are methods on observables that compose new observable by transforming source observable.

Operators are imported for side effects only (no export, only execute JavaScript) e.g. `import 'rxjs/add/operator/map'`

Operators pass each value from one operator to the next , before proceeding to the next value (by default). his is different from array operators which process the entire array at each step. Why this is important? On large arrays, intermediate arrays will have to be GC at some point.

### flatMap

flatMap operator accepts a function that returns an observable. What flatMap does, it's subscribing to this observable for us and will deliver results of this sibscription throughout the rest of the pipeline.

Note that completion of the pipeline depends on the completion of the first observable - if first/root observable is not complete and it can emit more values, it does not matter that flattened observable is completed.

### switchMap

The same as flatMap. Both operators automatically subscribe to the Observable that the function produces and flatten the result for us. The difference is that the switchMap operator automatically unsubscribes from previous subscriptions as soon as the outer Observable emits new values.

### map

Simple as that, just mapping one thing to another

### retryWhen

This operator can be used to retry if observable emited an error. What this operator accepts is a function that has one argument, which is an observable that is emitting errors :D, and it must return observable :)

What is special with this operator is that it is catching errors and it's emiting error (usually operators do not catch errors and they are uncaught errors)

### zip & combineLatest

zip combines emission of multiple observables. The CombineLatest operator behaves in a similar way to Zip, but while Zip emits items only when each of the zipped source Observables have emitted a previously unzipped item, CombineLatest emits an item whenever any of the source Observables emits an item

### debounceTime

Waits for given number of ms after last event occurs before emiting the event. Useful in reactive forms.

### delay

Adds delay before emiting

### filter

Used to filter emited values

### interval

Emits a sequence of integers

### scan((acc,cur))

Executes a function that takes previous result of the function and new emited value. This is common way to count how many items were emited by observable.

Used with `takeWhile` operator, can be used to stop the observable after given amount of items were emited.

### operator chains and killing the observable

Observables have three channels to communicate : next, error, complete (remember, each operator creates new observable).

```
Observable.interval(1000) // safe observer, producing data
  .filter(x => x % 2 === 0) // filter observer: every second value will not pass and won't be passed to next observer
  .map(x => x * 2) // map opserver
  .subscribe(x => console.log(x))
```

Operators return an Observable that creates an observer that passes values to another observer.

To understand chain, we need to know some rules. Observer will no longer pass alon values after:

- error is called (when for instance exception was thrown)
- complete is called
- unsubscribe

This **closes** observer (or operator), i.e. it will no longer pass values down the chain, i.e. calling `next` on it will have no effect.

To handle errors, there's a `catch` operator. What it realy does, is it creates a new observable the is the new start for the chain and it will enable finishing the job by the observers (operators) that are down the stream.

But everything else (whole observable) is "dead". In order to keep observable alive, we need to isolate observer chains.

This will kill the observable on first http error:

```
Observable.interval(1000) // safe observer, producing data
  .switchMap(() => http.get(url))
  .catch(err => Observable.empty()) // LOL, it still won't keep this interval alive, because switchMap's error was called, and switchMap is closed!
  .subscribe(x => console.log(x))
```

This will keep it alive:

```
Observable.interval(1000) // safe observer, producing data
  .switchMap(() => http.get(url).catch(err => Observable.empty())
  .subscribe(x => console.log(x))
```

## Custom operators

### Simplest operator

```ts
function myOperator<T>(source: Observable<T>) {
  return source;
}
```

### Custom filtering operator

```ts
function filterNil() {
  return function<T>(source: Observable<T>): Observable<T> {
    return new Observable(subscriber => {
      const subscription = source.subscribe({
        next(value) {
          if(value !== undefined && value !== null) {
            subscriber.next(value);
          }
        },
        error(error) {
          subscriber.error(error);
        },
        complete() {
          subscriber.complete();
        }
      });

      return () => subscription.unsubscribe(); <======
      // or return subscription
    });
  }
}
```

and usage

```ts
interval(1000)
  .pipe(
    map((value) => (value === 0 ? undefined : value)),
    filterNil()
  )
  .subscribe((value) => console.log(value));
```

Usually better way is to reuse existing operators:

```ts
function filterNil() {
  return function <T>(source: Observable<T>) {
    return source.pipe(
      filter((value) => value !== undefined && value !== null)
    );
  };
}
```

or even simpler:

```ts
function filterNil() {
  return filter((value) => value !== undefined && value !== null);
}
```

#### debug operator

```ts
function debug(tag: string) {
  return tap({
    next(value) {
      console.log(
        `%c[${tag}: Next]`,
        'background: #009688; color: #fff; padding: 3px; font-size: 9px;',
        value
      );
    },
    error(error) {
      console.log(
        `%[${tag}: Error]`,
        'background: #E91E63; color: #fff; padding: 3px; font-size: 9px;',
        error
      );
    },
    complete() {
      console.log(
        `%c[${tag}]: Complete`,
        'background: #00BCD4; color: #fff; padding: 3px; font-size: 9px;'
      );
    },
  });
}
```

#### optional debounce

```ts
function optionalDebounce<T>(time?: number) {
  return function <T>(source: Observable<T>): Observable<T> {
    return time === undefined ? source : source.pipe(debounceTime(time));
  };
}
```

#### keyboard events

```ts
type KeyboardEventKeys = 'Escape' | 'Enter';

function filterKey(key: KeyboardEventKeys) {
  return filter((event: KeyboardEvent) => event.key === key);
}
```

#### pooling

```ts
function polling<T>(stream: Observable<T>, period: number, initialDelay = 0) {
  return timer(initialDelay, period).pipe(concatMapTo(stream));
}
```

#### first truthy

```ts
function firstTruthy<T>(): MonoTypeOperatorFunction<T> {
  return (input$) => input$.pipe(first(Boolean));
}
```

#### live search

```ts
import { of, OperatorFunction, ObservableInput } from 'rxjs';
import {
  delay,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';

type DataProducer<T> = (q: string) => ObservableInput<T>;

//reusable custom operator
function liveSearch<R>(
  time: number,
  dataProducer: DataProducer<R>
): OperatorFunction<string, R> {
  return (input$) =>
    input$.pipe(
      debounceTime(time),
      distinctUntilChanged(),
      switchMap(dataProducer)
    );
}

const newsProducer = (query: string) =>
  of(`Data fetched for ${query}`).pipe(delay(2000));

const source$ = of('politics', 'sport');

const result$ = source$.pipe(liveSearch(500, newsProducer));

result$.subscribe(console.log);
```

> If your custom operator mirrors the input value, it has to be defined as a MonoTypeOperatorFunction (firstTruthy). On the contrary, if the operator returns an observable of values having a different type than the ones emitted by the source stream, it has to be defined as an OperatorFunction (liveSearch).

## Unsubscribing

`subscribe` returns a subcription function, that can be used to cancell subscription.

```
let subscription: Subscription = Observable.interval(1000).subscribe(x => console.log(x));
if (this.subscription) {
  this.subscription.unsubscribe();
}
```

When working with async pipe, pipe will automatically unsibscribe from Observable as soon as the component gest destroyed. But one additional feature of async pipe is that it will also unsubscribe when the value of the expression changes. It protects from memory leaks.

When creating observables manually with `Observable.create`, one can return a function from `create` and this will be unsubscribe function that will be called when `this.subscription.unsubscribe()` will be called.

Unsubscribing has to be done imperatively (manually calling unsubscribe) or partially declaratively using operators like `takeUntil`. Others: `take`, `first`, `takeWhile`, `switch`, `switchMap`. With these, you can use any event to trigger unsibscription.

I.e. when observable completes, it will automatically unsubscribe from its resources

Also libraries/frameworks have built in subscription management like `async` pipe in angular.

But... there's a gotcha: having `sthHttp$ | async` twice in template will cause two http requests. This is because http is cold observable and each subscription will cause http request.

To fix it, use `share` operator. But sharing comes at a cost (consumes more memory to manage state) , so don't overuse it.

## Higher order observables

We can have observable of anything: numbers, string, booleans etc. We can have observable that emits anything.

That also means that we can have observable that emits observable, if so this is called **higher order observabl**e.

`mergeMap`, `concatMap`, `switchMap` are handy operators to deal with higher-order observables. These are two step operators.

First, they map outer Observable items to inner Observables.
The second step is to merge a result set of inner Observables in some way.
The way they are merged depends on the operator you use.:

```
mergeMap = map + mergeAll // mergeAll takes argument that is max number of merged observables
concatMap = map + concatAll // it is equal to mergeAll(1)
switchMap = map + switch // good for http requests as it will cancel previous + switchMap automatically converts promises to observable
```

> Cool feature of these \*map operators is that they have 2nd argument which is result selector that gives access to outer value (the one that was emitted from original source observable)

```
// Just outputs the number of seconds since the start to visualize the time flow
// Not relevant to the example
Rx.Observable.interval(1000).take(12).subscribe(s => console.log(`⏰ ${s} sec`));

// Turns values from outer Observable into inner Observables
function getInnerObservable(outerParam) {
  return Rx.Observable.interval(1000).take(3)
    .map(n => `Inner item ${n} for ${outerParam}`);
}

const outerObservable = Rx.Observable.interval(1000).take(3)
  .map(n => 'Outer item ' + n);

// Uncomment for MergeMap
outerObservable.mergeMap(outerParam => getInnerObservable(outerParam))
  .subscribe(x => console.log(x));

// Uncomment for ConcatMap
// outerObservable.concatMap(outerParam => getInnerObservable(outerParam))
//   .subscribe(x => console.log(x));

// Uncomment for SwitchMap
// outerObservable.switchMap(outerParam => getInnerObservable(outerParam))
//   .subscribe(x => console.log(x));

// Naive solution with two subscriptions. Works similarly to MergeMap. Not recommended
// outerObservable.subscribe(outerParam => getInnerObservable(outerParam)
//   .subscribe(x => console.log(x)));
```

They differ slightly in a way how inner observables are handled, but other that that, they work the same.

> https://tolikcode.github.io/post/rxjsMap/

## Operators that produce higher-order observables

### Splitting observables

This is kinda interesting... Family of `window` operator deals with that.

### Grouping

`groupBy` also creates higher-order observable.

## Promise vs Observable

### Similarities

`p.then(onSuccess)` is `o.subscribe(onNext)`

### Differences

Promise

- single value in the future
- not lazy

Observable

- 0 or more values now or in the future
- any value that changes over time
- can be synchronous or asynchronous
- lazy: observable will not emit values untill they are subscribed to

Angular's observable can be converted to promise with `toPromise` method.

### Retrying

To retry a promise, you need to have a code / function that produced a promise.

Observable is a function - so if it failed, just retry it.

### Cancelling the subscription

```
const source = Observable.create(observer => {
  const id = setTimeout(() => {
    console.log('Timeout hit')
    observer.next('Hello World');
    observer.complete();
  }, 1000);
  console.log('Observable created');
  return () => {
    console.log('Unsubscribing');
    clearTimeout(id);
  }
});

const dispose = source.subscribe(x => console.log(x));

setTimeout(() => dispose.unsubscribe(), 500);
```

### Bridge the gap between Promise & Observable

`Observable.fromPromise` creates an observable from `Promise` .

However using e.g. `Observable.fromPromise(fetch(url))` will immediately invoke promise & we don't have lazy behaviour.

This is where `Observable.defer` helps: `Observable.defer(() => { return Observable.fromPromise(fetch(url)); })`

# Hot vs Cold observables

> https://blog.thoughtram.io/angular/2016/06/16/cold-vs-hot-observables.html

By default, all observables are cold - each subscription creates new producer: 1 consumer = 1 consumer.

From consumers side, it is (almost) impossible to know if observable is hot or cold.

## Cold observable

> cold observables create a new producer each time a consumer subscribes to them

- it starts producing values when subscriptions happens
- cold observable should produce fresh values upon subscription
- an iced cold Observable starts reproducing the values it emits independently with every new subscriber

> Http observables are ice cold!

## Hot observable

> hot observables share a single producer with every consumer that subscribes to them

- it does not wait for subscription to start producing values (e.g. click, mouse events)
- it produces values no matter if anyone listens or not
- there's no new value producer/source created upon subscription
- use `publish` to share the value producer across several subscriptions (one indicator of being hot!)
  - the publish operator creates an ConnectableObservable which means it creates an Observable that shares one single subscription to the underlying source
  - the publish operator doesn’t subscribe to the underlying source just yet
  - It’s the job of the connect operator to actually cause the ConnectableObservable to subscribe to the underlying source

## Http observable almost hot

```
this.contacts = http.get('contacts.json')
                    .map(response => response.json().items)
                    .publishLast()
                    .refCount();
```

This is perfect Http based observable:

- publishLast makes is hot (warm to be specific) and it will share single value producer. What is more, when new subscriptions arrive, they will get last emited value
- refCount makes sure that AJAX request will happend only when first subscription happens
- publishLast & refCount are so common that `share()` operator combines them two into one:

```
this.contacts = http.get('contacts.json')
  .map(response => response.json().items)
  .share();
```

Be aware, that sharing (aka multicasting) comes with a cost (manage state).

# Catching errors in Angular

```
someFnk() : Observable<T | TError> {
  this.http.get<T>(url).catch(this.handleError);
}
handleError(httpErrorResponse: HttpErrorResponse) {
  return { Observable.throw(...) }
}

someFnk.subscribe((arg: T) => ..., (arg: TError) => ...);
```

# Subject

A subject in Rx is a special hybrid that can act as both an observable and an observer at the same time. This way, data can be pushed into a subject and the subject’s subscribers will in turn receive that pushed data.

Use case:

- multicasting
- converting some source that is hard to wrap as obseravble

Internally the subject will keep a list of subscriptions.

Data can be pushed into the subject using its next method.

Facts:

- When a subject completes or errors out, all the internal subscriptions also complete or error out
- subject can passed as the observer to an observable `observable.subscribe(subject)`, this way we achieve multicasting as all subject's subscribes will recive events from observable.
- `asObservable` can be used to expose only observable interface of the subject, preventing the client code from pushing into the subject

## Regular Subject

- late subscribers don't receive data that was produced in the past

## BehaviourSubject

- late subscribers will receive default or last produced value

## ReplaySubject

- late subscibers will receive `n` previous values, based on subject's buffer size

# Lettable operators

- https://blog.angularindepth.com/managing-rxjs-imports-with-tslint-828cdc66b5ee
- https://github.com/ReactiveX/rxjs/blob/master/doc/lettable-operators.md#build-and-treeshaking
- https://blog.angularindepth.com/rxjs-understanding-lettable-operators-fe74dda186d3

Use `rxjs-tslint-rules` and

```
"rxjs-no-add": { "severity": "error" },
"rxjs-no-operator": { "severity": "error" },
"rxjs-no-patched": { "severity": "error" },
"rxjs-no-wholesale": { "severity": "error" }
```

to enforce lettable operators <https://blog.angularindepth.com/rxjs-understanding-lettable-operators-fe74dda186d3>

# Traps

- don't use mutable outer scoped variables in operators or subscriptions. Why ? Operators / subscriptions can sometimes execute synchronously and sometimes asynchronously. Observables execute as fast as they can (observable from array will do everything sync)
- too many operators to remember
- unbounded buffers (like in zip operator, when stream A produces values fast, and stream B slowly)

## RxJS Subjects and Multicasting Operators

> From <https://egghead.io/courses/rxjs-subjects-and-multicasting-operators>

This demonstrates a `cold observable` i.e. for each observer / subscriber new interval starts (a new producer is created):

```js
var observable = Rx.Observable.interval(1000).take(5);

var observerA = {
  next: function (x) {
    console.log('A next ' + x) || displayInPreview('A next ' + x);
  },
  error: function (err) {
    console.log('A error ' + err) || displayInPreview('A error ' + err);
  },
  complete: function () {
    console.log('A done') || displayInPreview('A done');
  },
};

observable.subscribe(observerA); // create an execution

var observerB = {
  next: function (x) {
    console.log('B next ' + x) || displayInPreview('B next ' + x);
  },
  error: function (err) {
    console.log('B error ' + err) || displayInPreview('B error ' + err);
  },
  complete: function () {
    console.log('B done') || displayInPreview('B done');
  },
};

setTimeout(function () {
  observable.subscribe(observerB);
}, 2000);
```

But what if we want to share data between multiple subscribers?

## Subject

Subject is `Observer/Subscriber` + `Observable` i.e. you can `subscribe` to it and you can pass it to `subscribe`.

### Subject as event bus

Can be used like this: just be extra careful i.e. don't break the observable contract (e.g. call error only once, after error no next etc.).

Do not expose `Subject` to external code, cast it to `Observable` first.

There are different kinds of subjects:

### BehaviorSubject

What is observer is late i.e. is subscribes after observable emits value?

`BehaviorSubject` is a subject that holds last (current) value.

If late observer arrives, it will get the last value from the subject.

### ReplaySubject

What is we want to get more than one last value when late observer subscribes?

`ReplaySubject` allows to replay `BUFFER_SIZE` of events.

With this subject you can even control TTL i.e. how long events are stored in the buffer!

#### Replay vs Behavior

`ReplaySubject(1)` it not the same as `BehaviorSubject`. Two important differences are:

- Behavior must have initial value
- When subject completes and late subscriber arrives, `Replay` will still replay N values vs `Behavior` will emit only `complete`

### AsyncSubject

This subject emits only one value, and only after observable completes.

Useful for sharing ultimate result / value of the observable.

It is a bit similar to `Promise`.

> Used very rarely

### `multicast` operator

What if we already have an observable and we want to support the same scenario i.e. multicasting (sharing the source) like with `Subject` where we have one producer for all consumers?

`multicast` operator allows to specify which subject will be used to achieve this behavior.

multicast() operator which subject or subject factory and returns `ConnectableObservable`. The subject passed as argument acts like a middleman in a multicast observable. It just relays data from source observable to all subscribers. `ConnectableObservable` is a regular observable, but it won’t subscribe to the source until connect() method is called.

```
var connectableObservable = Rx.Observable.interval(1000)
  .take(5)
  .multicast(new Rx.ReplaySubject(100));

var observerA = {
  next: function (x) { console.log('A next ' + x) || displayInPreview('A next ' + x); },
  error: function (err) { console.log('A error ' + err) || displayInPreview('A error ' + err); },
  complete: function () { console.log('A done') || displayInPreview('A done'); },
};


connectableObservable.connect(); // important : it subscribes to source (interval) with ReplaySubject. Without it, nothing happens

connectableObservable.subscribe(observerA);

var observerB = {
  next: function (x) { console.log('B next ' + x) || displayInPreview('B next ' + x); },
  error: function (err) { console.log('B error ' + err) || displayInPreview('B error ' + err); },
  complete: function () { console.log('B done') || displayInPreview('B done'); },
};

setTimeout(function () {
  connectableObservable.subscribe(observerB);
}, 2000);
```

So in essence: this operator hides subject behind `ConnectableObservable`.

#### `connect` result

`connect` returns a subscription. We are in control of when to start the shared subscription (calling `connect)` and where to stop it with (calling `unsubscribe`).

> When having this level of control, be careful not to cause memory leaks (forgetting to unsubscribe)

#### don't use `multicast`

Usually using `multicast` and having manual control over `connect` and `unsubscribe` is not something we want.

Instead use `refCount` operator that converts `ConnectableObservable` back to `Observable` and it counts number of subscriptions. If subscriptions grow from 0->1 then `connect` is called under the hood, if count goes from 1->0 then `unsubscribe is called`.

### `publish` operator

it equals `multicast(new Subject())`

### `publishReplay` operator

it equals `multicast(new ReplaySubject())`

### `publishBehavior` operator

it equals `multicast(new BehaviorSubject())`

### `publishLast` operator

it equals `multicast(new AsyncSubject())`

### `share` operator

it equals to `publish + refCount`

### `shareReplay` operator

it equals to `publishReplay + refCount`

### Other topics

#### Subject factory and reusable multicasting

`multicast` operator can take a subject factory function. Use it, to make shared observable more reusable i.e. if you use subject instance e.g. `multicast(someSubjectObj)`, then if source observable completes, then subject also completes. Then refCount goes to zero and back to one once again, then subject is already completed. So the solution is to use subject factory `multicast(() => new Subject())`

#### Selector function

`multicast` and other opertators like `publish` take other argument that is selector function.

This selector function takes already shared observable that can be used to compose other observables. There's no need to use `connect` - as a matter of fact, if overload with selector function is used, then `multicast` returns normal observable instead of `ConnectableObservable`. Connecting is done automatically when subscription to `multicast` returned observable happens:

```ts
function subjectFactory() {
  return new Rx.Subject();
}

var result = Rx.Observable.interval(1000)
  .take(6)
  .do((x) => console.log('source ' + x))
  .map((x) => Math.random())
  .multicast(subjectFactory, function selector(shared) {
    var sharedDelayed = shared.delay(500);
    var merged = shared.merge(sharedDelayed);
    return merged;
  });

var sub = result.subscribe((x) => console.log(x));
```

### Summary

Subjects are powerful - but keep them hidden. Try to use operators that deal with them under the hood.

# Links

- Courses
  - https://egghead.io/courses/save-time-avoiding-common-mistakes-using-rxjs
  - https://egghead.io/courses/rxjs-subjects-and-multicasting-operators
  - https://egghead.io/courses/use-higher-order-observables-in-rxjs-effectively
- Testing
  - https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md
- Set of articles
  - https://gist.github.com/staltz/868e7e9bc2a7b8c1f754 - great article, how to write Twitter widget with suggestions
  - https://blog.thoughtram.io/angular/2016/01/06/taking-advantage-of-observables-in-angular2.html - Wiki Search
  - https://blog.thoughtram.io/rx/2016/08/01/exploring-rx-operators-flatmap.html - flatMap explained
- https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/creating.md#cold-vs-hot-observables : cold vs hot one more time
- https://www.youtube.com/watch?v=3LKMwkuK0ZE great talk RxJS 5 Thinking Reactively | Ben Lesh
- https://www.youtube.com/watch?v=K7AvXUNB2X8 great talk Ng-Cruise - RxJS By Example with Ben Lesh
- https://www.youtube.com/watch?v=KOOT7BArVHQ - RxJS In-Depth – Ben Lesh cool angular connect 2015 on RxJS with https://github.com/jeffbcross/aim RxJS wrapper over web sockets example
- https://www.youtube.com/watch?v=X_RnO7KSR-4 Ben Lesh - Advanced RxJS: State Management and Animations, cool with plenty of high order functions & schedulers
- https://www.youtube.com/watch?v=aYurQaN3RoE - Not so great, nothing cool
- https://medium.com/@benlesh/learning-observable-by-building-observable-d5da57405d87 : what is safe observer + how to write your own observable from scratch (shows that observables are just a functions that take observer and return a function + why wrapping this function in a Observable class is useful)
- Subjects - https://alligator.io/rxjs/subjects/ - simple comparsion of Behaviour/Replay and plain Subject
- How vs Cold - https://medium.com/@benlesh/hot-vs-cold-observables-f8094ed53339 - how vs cold vs warm - https://alligator.io/rxjs/hot-cold-observables/ - https://blog.thoughtram.io/angular/2016/06/16/cold-vs-hot-observables.html - this article introduces a term warm observable , which is different from what Ben Lesh thinks.

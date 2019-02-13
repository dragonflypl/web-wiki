# Puppeteer

- not a testing framework. Can be used with testing frameworks to automate browsers
- can be used to E2E testing
- only Chrome is supported. This is API to control Chrome! Puppeteer is Chrome.
- works with Jest/Mocha/Jasmine etc.
- test are not brittle!
- async/await support
- access to everything in devtools (console output/network/profile etc... everything!) e.g. write assertion to query console and check if there are no errors / warnings
- enables intercepting requests
- visual regression tests
- there's a puppeteer recorder Chrome extension: https://github.com/checkly/puppeteer-recorder
- zero config: just pass path to chrome executable
- Cool stuff that can be made
  - server side rendering (even if framework does not support it)
  - code coverage API + puppeteer-to-istanbul
  - crawl SPA
  - service worker valication
- Resources:
  - https://github.com/GoogleChromeLabs/puppeteer-examples
  - https://www.youtube.com/watch?v=lhZOFUY1weo browser automation with puppeteer
  - https://www.youtube.com/watch?v=xwiWqEkrtyQ e2e testing basics
  - https://www.youtube.com/watch?v=U_z9x6ZtDow ways to measure performance
  - https://www.youtube.com/watch?v=ARt3zDHSsd4 some API examples
  
  - Code snippets
 
 ### How to intercept requests
 
 ```
 page.on('request', req => {
  if (sth) req.abort() else req.continue();
 }
 ```
 
 ### How to wait for idle network
 
  ```
  page.goto(url, {waitUntil: 'networkidle0'});
  page.content();
  ```
### How to run script in page context

```
page.evaluate
```

### How to type

```
page.focus(selector);
page.keyboard.type(text);
```

# AngularJS - with testability in mind

AngularJS is written with testability in mind - it things are done **the right way**:

- use Dependency Injection
- Don't use globals
- Modules separation (app.config, app.services, app.userManagement)
- Use right framework components for different things (directives for DOM manipulation, services for XHR requests)

Tools:

- Protractor - E2E Tests
- Karma: test runner
- Jasmine: BDD framework with assertions support & spies
 - grouping code / tests
 -- `beforeEach`, `afterEach`, `it`, `xit`, `describe`
 -- `beforeAll`, `afterAll` & `shareadInjector` (add state to test - wrong)
- `ngMock`: Angular's module that set up testing environment (e.g. mock services)

> Power hint: fit / fdescribe - focus on particular tests

# Karma / Jasmine

## Using ngMock

- `ngMock` gives access to `angular.mock` object
- `angular.mock` functions are available globally (like `inject`, `module`, `dump`)
- decorates / adds new services https://docs.angularjs.org/api/ngMock

## Registering modules

In order to test some code, it first has to be loaded (registered) into AngularJS framework. This is done via module loading.

* loading existing module with string. Registers all module components

``` javascript
angular.mock.module('moduleName') // 
```
* creating module on the fly, with function. Override / add new components

``` javascript
angular.mock.module(function($provide) {
  $provide.factory('serviceName', function() {
    return {};
  });
}
```

* with object (registers services as values). Override / add new components
 
``` javascript
angular.mock.module({
  'serviceName': {}
})
```

> Hint: split app code into many Angular modules. This will make testing easier (prevent unnecessary code from running). 

`Jasmine` / `ngMock` clears environment for each test (new injector, new service instances). Thus, module loading has to be done before each test (`beforeEach`):

```
  beforeEach(module('app'));
  beforeEach(inject(function(_someService_){
    someService = _someService_;
  }));
```

## `$http` & `$httpBackend`

`$httpBackend` has two methods to set up `$http`: `when` & `expect` (difference between both is that `expect` is strict and used to make assertions about the calls e.g. and order of calls is important and call must be done. `when` is just to satisfy `$httpBackend` that requests XHR might occur):

``` javascript
// also whenXXX exist, where XXX is method name eg. whenGET
$httpBackend.when(method, url, data, headers).respond(statusCode, data);
$httpBackend.expect(method, url, data, headers).respond(statusCode, data);
```

To assert requests call:

``` javascript
afterEach($httpBackend.verifyNoOutstandingRequest);
afterEach($httpBackend.verifyNoOutstandingExpectation);
```

Instead of string URL , a method can be used that returns boolean if url matches the pattern.

```$httpBackend.flush``` must be called in order to execute all pending http requests. It is a good practice to use it as (in order to avoid errors when programmer wants to flush something, but there's nothing to flush):

> `$httpBackend.flush` is like `$rootScope.$digest` for watchers & promises

```
expect($httpBackend.flush).not.toThrow();
```

## `$timeout` & `$interval`

ngMock decorators. Two important methods are:

- ```$interval/$timeout.flush([delay])```
- ```$timeout.verifyNoPendingTasks()```

## TzDate

TzDate is a mock of the Date type which has its timezone specified via constructor arg. 

The main purpose is to create Date-like instances with timezone fixed to the specified timezone offset, so that we can test code that depends on local timezone settings without dependency on the time zone settings of the machine where the code is running.

## `$exceptionHandler` & `$log`

```$exceptionHandler``` is serivce for handling exceptions. It's mock implementation has ```errors``` collection that stores handled exceptions. Configuration is made via ```exceptionHandlerProvider.mode```.

```$log``` is service for logging. It's mock implementation has collection of logged messages per log level + a handful of useful methods:

``` javascript
$log.info.logs
$log.error.logs
$log.debug.logs
// ....
$log.reset(); // clears all arrays
$log.assertEmpty() // throws error if any of log levels has value
```

## Testing directives / components

Directives / components can be tested on two levels:

- just controller (`$controller` / `$componentController`)
 - only controller instance is created
- whole component / directive (`$compile` & `$rootScope`)
 - includes lifecycle hooks execution
 - includes binding execution
 - template is needed
 - DOM is alive

Tests run **outside Angular world**. Thus `$rootScope` is essential. It's needed to fire watchers.

## `$controller` / `$componentController` services

```$controller/componentController(controllerNameOrFactoryFnk, locals, bindings)``` enables controller creation. It can be created based on name or by function. 2nd argument is list of locals used with DI and 3rd argument is object with controller bindings (used with controllerAs approach)

## Caveat : templateUrl

- often components / directive use `templateUrl`
- testing environment does not allow **completely** to issue requests (**$httpBackend**) 

Solutions:

- copy/paste template, put it inside cache (bad)
- build html into js module & put is inside cache (e.g. gulp libraries)
- use  karma-ng-html2js-preprocessor

## Testing promises

- Promises by design are asynchronous
- $q promises are fired after digest cycle
- to resolve promises, call $digest

## Disabling services

Some services:

- do not need testing
- are hard to test 
- are everywhere and cause side effects

Common example: `$state`

Solution: disable the service by creating mock that is just a sink for method calls:

```
        $provide.provider('$state', function() {
            this.state = jasmine.createSpyObj('state ', ['play', 'pause', 'stop', 'rewind']);
            this.$get = function() {
                return {
                    // current: {},  // fake before each test as needed
                    // state:  {}  // fake before each test as needed
                    // more? You'll know when it fails :-)
                    _faked: 'this is the faked $state service'
                };
            };
        });
```

## Spies

Enable:

- recording of information about test execution (track calls, return values, arguments) that can be asserted
- change the behavior (change return values `returnValue` / replace implementations `callFake`)

## Async support

If test depends on asynchronous operation, Jasmine should wait until it is done.

`it` can take `done` argument (function). If passed, Jamine will wait until this function is called.

## Trigger events

`triggerHandler` is jqLite method to use


# Protractor

Protractor is a wrapper around WebDriverJS that is aware of Angular.

https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs

## Karma - runtime different

- Karma / Jasmine: browser
- Protractor: Node.js, communication with browser via WebDriver commands

Consequences: harder to debug

> use gom-gulp's `gom-protractor` script

## ngMockE2E $httpBackend 

This version of ```$httpBackend``` allows to set up fake backend useful for e2e testing or **backendless development**. The difference between ```ngMock``` and ```ngMockE2E``` versions of ```$httpBackend``` is that later enables a mixture of real and fake HTTP calls with ```passThrough()```:

``` javascript
module.run(function ($httpBackend) {    
    var data = ['tt0076759', 'tt0080684', 'tt0086190'];
    var headers = {
      headers: {'Content-Type': 'application/json'}
    };

    // return the Popular Movie Ids
    $httpBackend.whenGET(function(s) {
      return (s.indexOf('popular') !== -1);
    }).respond(200, data, headers);

    //allow all other requests to run
    $httpBackend.whenGET(/.*/).passThrough();
});
```

## WebDriver

## Protractor's API

### browser

Interaction with the browser

### Locator

- describes how to find elements
- passed down to `element` or `element.all`

### ElementFinder

- object that enables interaction with DOM elements
  - `click`, `getText`, `sendKeys`
- returned via `element` or `element.all` function

## Async

All Protractor actions are asynchronous: 

- executed immediately in Nods.js program
- all actions are asynchronous, all action methods return a promise
- promise manager: enables writing code as it was synchronous and Protractor API was blocking
- locators execution is lazy (e.g. runs when ElementFinder action like sendKeys is executed)
- WebDriverJS maintains a queue of pending promises (control flow) to keep execution organized
- Protractor and Jasmine: 
 - modified specs: Jasmine waits until control flow queue is empty before executing next test
 - modified expectations: work with promises

```
var el = element(locator);

// Click on the element.
el.click();

// Send keys to the element (usually an input).
el.sendKeys('my text');

// Clear the text in an element (usually an input).
el.clear();

// Get the value of an attribute, for example, get the value of an input.
el.getAttribute('value');

el.getText().then(function(text) {
  console.log(text);
});

expect(name.getText()).toEqual('Jane Doe');
```

## Debugging

Inserting `debugger;` somewhere in the test

- will pause program execution even before page is loaded
- use `then(function() { debugger }) `
- use async/await (provided Node.js versions supports it)
- use `browser.pause()` and open DevTools when execution is paused (**close DevTools when done**)

## Mocking strategies

- do not mock at all
- enable special modules during tests (`browser` API)
- mock backend with `$httpBackend`
- mock backend with proxy / fake backend
- do not mock at all

## Organizing test code 

- Page objects: design pattern (wrap pages / directives / dialogs / common elements)
 - reusable
 - decouping of test logic from from page implementation 
- use modules (CommonJS)
 - `module.exports` / `require`
 -  Node.js is runtime environment

## Protractor & Angular

- Protractor knows about Angular
- Hooks into Angular's async tasks and waits until they are settled

# Links

- https://github.com/angular/protractor/blob/master/docs/tutorial.md
- https://github.com/angular/protractor/blob/master/docs/locators.md

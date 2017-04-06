# AngularJS - with testability in mind

AngularJS is written with testability in mind - it things are done **the right way**:

- use Dependency Injection
- Don't use globals
- Modules separation (app.config, app.services, app.userManagement)
- Use right framework components for different things (directives for DOM manipulation, services for XHR requests)

Tools:

- Karma: test runner
- Jasmine: BDD framework with assertions support & spies
 - grouping code / tests
 -- `beforeEach`, `afterEach`, `it`, `xit`, `describe`
 -- `beforeAll`, `afterAll` & `shareadInjector` (add state to test - wrong)
- `ngMock`: Angular's module that set up testing environment (e.g. mock services)

# Using ngMock

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

# With ngMock

## Regiestering modules

* with string

``` javascript
angular.mock.module('moduleName')
```
* with function

``` javascript
angular.mock.module(function($provide) {
  $provide.factory('serviceName', function() {
    return {};
  });
}
```

* with object (registers services as values)
 
``` javascript
angular.mock.module({
  'serviceName': {}
})
```

## $http & $httpBackend

$httpBackend has two methods to set up $http: when & expect (difference between both is that expect is strict and used to make assertions about the calls eg. and order of calls is important and call must be done):

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

```$httpBackend.flush``` must be called in order to execute all pending http requests. It is a good practice to use it as (in order to aviod errors when programmer wants to flush something, but there's nothing to flush):

```
expect($httpBackend.flush).not.toThrow();
```

## $controller service

```$controller(controllerNameOrFactoryFnk, locals, bindings)``` enables controller creation. It can be created based on name or by function. 2nd argument is list of locals used with DI and 3rd argument is object with controller bindings (used with controllerAs approach)

## $timeout & $interval

ngMock decorators. Two important methods are:
- ```$interval/$timeout.flush([delay])```
- ```$timeout.verifyNoPendingTasks()```

## TzDate

TzDate is a mock of the Date type which has its timezone specified via constructor arg. 

The main purpose is to create Date-like instances with timezone fixed to the specified timezone offset, so that we can test code that depends on local timezone settings without dependency on the time zone settings of the machine where the code is running.

## $exceptionHandler & $log

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

This version of ```$httpBackend``` allows to set up fake backend useful for e2e testing or **backendless development**. The difference between ```ngMock``` and ```ngMockE2E``` versions of ```$httpBackend``` is that later enables a mixture of real and fake HTTP calls.


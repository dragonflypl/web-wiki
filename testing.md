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

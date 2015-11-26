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

$httpBackend has two methods to set up $http: when & expect (difference between both is that expect is strict eg. and order of calls is important):

``` javascript
// also whenXXX exist, where XXX is method name eg. whenGET
$httpBackend.when(method, url).respond(statusCode, data);
$httpBackend.expect(method, url).respond(statusCode, data);
```

```$httpBackend.flush``` must be called in order to execute all pending http requests.



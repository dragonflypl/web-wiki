# With ngMock

- regiestering modules
 - with string

``` javascript
angular.mock.module('moduleName')
```

 - with function

``` javascript
angular.mock.module(function($provide) {
  $provide.factory('serviceName', function() {
    return {};
  });
}
```

 - with object (registers services as values)
 
``` javascript
angular.mock.module({
  'serviceName': {}
})
```

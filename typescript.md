## VS Code

### Task Runner

To define task runner, use CTRL+SHIFT+B

### tsd tool

tsd tool (https://www.npmjs.com/package/tsd) enables access to https://github.com/DefinitelyTyped/DefinitelyTyped repo via cli:

```
npm install tsd -g
tsd install <lib-name> --save
```


## AngularJS & TypeScript

### $resource service

``` typescript

interface IProduct {}

interface IProductResource extends ng.resource.IResource<IProduct> {}

interface IDataAccessService {
  getProductService(): ng.resource.IResourceClass<IProductResource>
}

class DataAccessService implements IDataAccessService {
  static $inject = ['$resource'];
  constructor(private $resource: ng.resource.IResourceService) {}
  
  getProductService(): ng.resource.IResourceClass<IProductResource> {
    return this.$resource(url);
  }
  
}

angular.module('app).service("dataAccessService', DataAccessServcice);
```

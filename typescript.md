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

### Building controllers

``` typescript
module app.controllers {

    interface IProductDetailModel {
        title: string;
        product: app.product1.IProduct;
    }

    interface  IProductParams extends ng.route.IRouteParamsService {
        productId: number
    }

    class ProductDetailCtrl implements IProductDetailModel {

        title: string;
        product: app.product1.IProduct;

        constructor(private $routeParams: IProductParams, private dataAccessService: app.product1.IDataAccessService) {
            this.title = "Title";
            var obj:app.product1.IProduct = dataAccessService.getProductService().get();
            obj.productName = "test";
            obj.$save();
        }
    }

    angular.module("app").controller("ProductDetailCtrl", ProductDetailCtrl);
}
```

### $resource service

``` typescript
module app.product12 {

    interface IProduct {
        productName: string;
    }

    interface IProductResource
        extends ng.resource.IResource<IProduct>, IProduct {
    }

    interface IDataAccessService {
        getProductService() : ng.resource.IResourceClass<IProductResource>
    }

    class DataAccessService implements IDataAccessService {
        constructor(private $resource:ng.resource.IResourceService) {
        }

        getProductService() : ng.resource.IResourceClass<IProductResource> {
            return this.$resource("sampleUrl");
        }
    }

    var dac = new DataAccessService(null);
    var res : IProductResource = dac.getProductService().get();
    res.productName = "test";

    angular.module('app').service('dataAccessService', DataAccessService);
}
```

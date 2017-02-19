# Why TypeScript

- superset of JavaScript
- types adds safety
- faster development (with TypeScript aware editor give intellisense support & navigation)
- compiles to ES5 / ES2015

# Installing

    npm install typescript -g

# Syntax

## Creating classes with private/public fields

```
class HelloWorldPublic {
    constructor(public name: string) {}
}

console.log(new HelloWorldPublic("Pawel").name);

class HelloWorldPrivate {
    constructor(private name: string) {}
    
    sayHello() {
        console.log(this.name);
    }
}

console.log(new HelloWorldPrivate("Pawel").sayHello()); 
```

## Types

```
let i:number;
let s:string;
let b:boolean;
let a:any;
let v:void;
let arr: number[];
let arr2: Array<number>;
enum City { Brugia, Krakow, Olkusz };
let destination: City = City.Olkusz;
let implicit = "test";
// implicit = 1; error
function returnNumber() : number {
    return i;
}
let tuple: [string, boolean] = ["test", true];
```

<hr  />

## VS Code

### Task Runner

To define task runner, use CTRL+SHIFT+B

### tslint

linting tool for TypeScript

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

Some example code (yet this one is much better and supports creating new instances: https://gist.github.com/scottmcarthur/9005953 ):
``` typescript
module app.product1 {

    export interface IProduct
        extends ng.resource.IResource<IProduct> {
        productName: string;
    }

    interface IProductResource
        extends ng.resource.IResourceClass<IProduct> {
    }

    export interface IDataAccessService {
        getProductService(): IProductResource
    }

    class DataAccessService implements IDataAccessService {
        static $inject = ['$resource'];

        constructor(private $resource:ng.resource.IResourceService) {
        }

        getProductService():IProductResource {
            return <IProductResource> this.$resource("sampleUrl");
        }

    }

    var dac = new DataAccessService(null);
    var res = dac.getProductService().get();
    res.productName = "test";

    angular.module('app').service('dataAccessService', DataAccessService);
}
```

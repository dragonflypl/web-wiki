# Why TypeScript

- superset of JavaScript
- types adds safety
- faster development (with TypeScript aware editor give intellisense support & navigation)
- compiles to ES5 / ES2015

# Installing

    npm install typescript -g

# Compiler options

Some commonly used compiler options are:
- --module
- --target
- --watch
- --outDir
- --noImplicitAny

## tsconfig.json

Marks root of TypeScript settings.

Compiler searches for tsconfig.json in current directory and if does not find one, looks up in directory tree.

```
{
	"compilerOptions": {
		"target": "es5",
		"outDir": "js"
	},
	"files": []
}
```

# Type Definitions

- design-time & compilation support
- contain no implementation details
- ```*.d.ts``` files

Sources:
- Definately Typed repo (manually download type definitions)
- npm packages
- ```typings``` and ```tsd``` (depracated) tools

Use ```npm install typings --global```. It creates typings folder with downloaded type definitions. The only things that needs to be referenced in app is index.d.ts file:

```
/// <reference path="typings/index.d.ts" /> 

import * as _ from "lodash";

let snake: number = _.snakeCase("test test test"); // error, type invalid
```

## Union types

"Cool" feature? It specifies that variable can be one of N types. Only shared properties/methods of all types can be used:

```
class A {
    propA: string;
    propC: string;
}

class B {
    propB: string;
    propC: string;
}

let aOrB : A | B = null;

callMe(aOrB);
callMe(new A());
callMe(new B());

function callMe(something: A | B) {
    if (something) {
        console.log(something.propC); // propA & propB cause compile error
    }
}
```

## Intersection types

Similar to union, but type must have all interface from all declared types:

```
class A {
    propA: string;
}

class B {
    propB: string;
}

let aOrB : A & B = null;

callMe({
    propA: "valA",
    propB: "valB"
})

function callMe(something: A & B) {
    if (something) {
        console.log(something.propA);
        console.log(something.propB);
    }
}
```

# Syntax

## Spread and Rest operators

```
function spread(a,b,c, ...rest) {
    console.log(a,b,c, rest);
}

spread(...[1,2,3,4,5,6]);
```

outputs:

```
1 2 3 [ 4, 5, 6 ]
```

## Destructuring assignment

### Objects

```
let obj = {
    firstName: "first",
    lastName: "last"
}

let { firstName, lastName } = obj;
let { firstName: customVarName1, lastName: customVarName2 } = obj;

console.log(firstName, lastName);
console.log(customVarName1, customVarName2);
```

outputs:

	first last
	first last


### Objects and parameters

Please note the type of the function parameter. It is a type of object being passed. Types of destructured properties are infered.

```
class Person {
    constructor(public firstName: string, public lastName: string) {}
}

function printFirstAndLast({firstName, lastName}: Person)  {
    console.log(firstName)
    console.log(lastName)
}

printFirstAndLast(new Person("Pawel", "Wu"))
```

### Arrays

```
let [first,second] = [0,1];
console.log(first)
console.log(second)
```

### Parameters & arrays

```
function takeFirstAndRest([first, ...rest]: string[]) {
	console.log(first);
	console.log(rest);
}

takeFirstAndRest([1,2,3,4,5]);
```

outputs:

	1
	[ 2, 3, 4 ]


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
function returnNumber(test: boolean) {
    return test ? "1" : 2;
}

let x = returnNumber(true);
let tuple: [string, boolean] = ["test", true];
console.log("Tuple 0 " + tuple[0]);
console.log("Tuple 1 " + tuple[1]);
```

## Functions

Enhancments:
- specify parameter & return types

- function types

```
let predicate: (name: string) => boolean;
predicate = function(name: string) {
    return name.length > 0;
}

console.log(predicate("Test"));
console.log(predicate(""));
```

- arrow functions
- parameters
 - optional parameters: in TypeScript all parameters are required by default. Add '?' to make is optional
 
```
function twoOrOne(one: string, two? : string) {
    console.log(one, two);
}
// twoOrOne(); error - by default parameter is required
twoOrOne("one");
twoOrOne("one", "two");
```

 - default parameters
 
```
function withDefault(param: string = "This is default value") {
    return param;
}
console.log(withDefault());
console.log(withDefault(undefined));
console.log(withDefault("Some value"));
```

 - rest operator
 
```
function callWithManyParams(prefix: string, ...arr: string[]) {
    console.log(prefix + arr.join(','));
}
callWithManyParams("-->", "1", "2", "3");
```
- function overloads: works by specifying multiple signatures of the function, and one implementation:

```
function overload(name: string) : void;
function overload(name: string, type: boolean) : void;

function overload(...args) {
    if (args.length === 1) {
        console.log("only name");
    }
    if (args.length === 2) {
        console.log("both");
    }
}

overload("Name only")
overload("Name only", true);
```

## Interfaces

Interfaces work in a with "duck typing". As long as object has needed properties/methods, it's considered to implement interface.

Defining interface:
- interface can have optional fields (?)
- interface can have fields
- interface can have methods (syntax slightly different from arrow function)

```
interface Book {
    author: string;
    title: string;
    rating?: number,
    friendlyName() : string
}

class BigBook implements Book {
    friendlyName(): string {
        return `${this.title} by ${this.author}`;
    }
    constructor(public title: string, public author: string) {}
}

let book = new BigBook("Hary Porter", "Adam Mickiewicz");
let bookImplicit : Book = {
    title: "Dziady",
    author: "Adam Mickiewicz",
    friendlyName() {
        return null;
    }
};

console.log(book.friendlyName());
console.log(bookImplicit.friendlyName());
```

### Interfaces for Function Types

This is preety new. It is possible to define interface for a single function:

```
interface Predicate {
    (text: string): boolean;
}

function filter(values: string[], predicate: Predicate) {
    return values.filter(predicate);
}

let lengthPredicate: Predicate = x => x.length > 2;
let copy : (text: string) => boolean = lengthPredicate; // difference between function interface and type function type

console.log(filter(["a", "bb", "ccc"], lengthPredicate));
console.log(filter(["a", "bb", "ccc"], copy));
```

### Extending interfaces

Extending interface is done with ```extends``` keyword:

```
interface A {};
interface B extends B{};
```

### Implementing interface

Implementing is done via classes and ```implements``` keyword:

```
interface A {};
class B implements A {};
```

## Classes

Have following constructs:
- getters/setters
- (constructor) parameter properties
- (class) static properties

```
class Person {

	constructor(private val: string) {}

	get name(): string {
		return this.val;
	}

	set name(val): string {
		this.val = val;
	}	
    
    static friendlyName: string = "Homo sapiens";
}

let p = new Person("first test");
console.log(p.name);
p.name = "second test";
console.log(p.name);
console.log(Person.friendlyName);
```

### Access modifiers

By default, it's public. Other available are ```private``` & ```protected```.

Access modifiers can be used on methods & properties & getters / setters.

### Inheritance

- is implemented with extends keyword.
- super refers to parent type. In child constructor, you're required to call super constructor (```super()```). In methods super grants access to parent members (useful when overriding methods):

```
class Person {
	constructor(protected val: string) {}

	helloWorld() {
		console.log(this.val + " Hello world!");
	}
}

class SuperPerson extends Person {
	constructor(val: string) {
		super(val);
	}

	helloWorld() {
		super.helloWorld();
		console.log(this.val + " Hello world 2!");
	}	
}
 
new SuperPerson("Pawel").helloWorld();
```

### Abstract classes

Implemented with ```abstract``` keyword on class/methods/getters&setters.

```
abstract class Person {
	constructor(protected val: string) {}

	abstract helloWorld() : void;

	abstract get sth(): string;
}

class SuperPerson extends Person {
	constructor(val: string) {
		super(val);
	}

	helloWorld() {
		console.log(this.val + " says Hello world!");
	}	

	get sth(): string {
		return "sth";
	}
}

let p = new SuperPerson("Pawel"); 
p.helloWorld();
console.log(p.sth);
```

### Class expressions

Hmm, I can not find any use case for this feature. Basically whenever class is needed, a class expression can be used.

# Modules & Namespaces

## Namespaces

Are a means to organize code in namespace containers, good for small apps. They work in conjunction with ``` /// reference ....``` syntax that provides IDE support and instructs compiler to compile referenced files.

In browser all js files must be included in order unless compiler ```--outFile``` flag is used, then output file will have all compiled code.

```
namespace Animals {

	abstract class LivingCreature {
		constructor(public name: string) {}
	}

	export class Human extends LivingCreature {}
	export class Animal extends LivingCreature {}
}

let human = new Animals.Human("Pawel");

console.log(human.name);
```

## Modules

TypeScript uses ES2015 modules syntax, and can compile to all known module formats (CommonJs, AMD, System, ES2015)

- exports

```
export abstract class LivingCreature {
	constructor(public name: string) {}
};

abstract class AlienCreature {
	constructor(public name: string) {}
};

abstract class SeaCreature {
	constructor(public name: string) {}
};


export { AlienCreature, SeaCreature as SeaMonster };
```

- default exports
 
```
// SomeClass.ts
export default class SomeClass {}
```

and importing it (no need for ```{}```):

```
import whatEver from './SomeClass'
```

- imports

```
// change name
import { LivingCreature as Creature } from './livingcreature';
// import all
import * as world from './livingcreature';
// import with original name
import { MyConst } from './reimport';

namespace Animals {
	export class Human extends Creature {}
	export class Animal extends Creature {}
	export class Kraken extends world.SeaMonster {}
}
```

## Generics

- generic functions

```
function LogAndReturn<T>(val: T) : T {
	console.log(val);
	return val;
}

console.log(LogAndReturn<number>(11));
```

- generic interfaces / classes

Nothing special here, syntax is typical:

```
interface Logger<T> {
    log(item: T);
}

class StringLogger implements Logger<string> {
    log(item: string) {
        console.log(item);
    }
}

class GenericLogger<T> implements Logger<T> {
    log(item: T) {
        console.log(item);
    }
}

let genericLogger = new GenericLogger<number>();
genericLogger.log(3);

let stringLogger = new StringLogger();
stringLogger.log("3");
```

- generic constraints

Also nothing special, typical syntax:

```
interface Loggable {
    name: string;
}

class LoggageImpl implements Loggable {
    name: string;
}

interface Logger<T extends Loggable> {
    log(item: T);
}

class GenericLogger<T extends Loggable> implements Logger<T> {
    log(item: T) {
        console.log(item);
    }
}

let genericLogger = new GenericLogger<LoggageImpl>();
genericLogger.log({ name: "some name"});
genericLogger.log({}); // error
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

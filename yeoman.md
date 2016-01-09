# Yeoman

Install it:
> npm install yo -g

Install webapp generator:
> npm install generator-webapp -g

Run generator:
> yo webapp

Accessing sub-generators

> yo [generatorName] --help

## Creating generator

1. Create generator (```npm init```) and install ```npm install yeoman-generator --save```
2. Create app folder with index.js - this will be entry point for generator (by default)
3. Use ```npm link``` in generator's folder to be able to launch it
4. Code:

```
'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

    constructor: function () {
        generators.Base.apply(this, arguments);

    },

    init: function () {
        this.log('inside init');
        // private method cos added to instance
        this.baz = function () {
            this.log('inside baz');
        }
    },
    
    // private method cos prefixed with _
    _foo: function () {
        this.log('inside foo');
    },
    
    // public - executed by default
    bar: function () {
        this.log('inside bar');
        this._foo();
        this.baz();
        this.anotherHelper();
    }
});
```

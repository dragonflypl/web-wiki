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

## Running context

Predefined set of methods that are always executed in this order:

```
initializing: function(){
},
prompting: function(){
},
configuring: function(){
},
default: function(){
},
writing: function(){
},
conflicts: function(){
},
install: function(){
},
end: function(){
}
```

### File context

- Destination context - place where application is scaffolded (working directory or closest parent directory with .yo-rc.json file)
- Template context - directory with template files, used for reading (source)

Yeoman uses in-memory file system. Before anything is writen to disk, conflict resolution happens to ensure no accidential overrides.

## "Writing" API

Here's API used in writing step:
- copy files & directories

```
appStaticFiles: function(){
    this.copy('_favicon.ico', 'src/favicon.ico');
    this.directory('styles', 'src/styles');
},
```

- templating with ```this.fs.copyTpl```

```
html: function(){
    this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('src/index.html'),
        {
            appname: 'My Cool App',
            ngapp: 'myapp'
        }
    );
}
```

- simple copy with ```this.fs.copy```

```
html: function(){
    this.fs.copy(
        this.templatePath('app/layout/_shell.html'),
        this.destinationPath('src/app/layout/shell.html'));
}
```

- dynamic files

```
bower: function(){
    var bowerJson = {
        name: 'my-app',
        license: 'MIT',
        dependencies: {}  
    };
    bowerJson.dependencies['angular'] = '~1.4.6';
    bowerJson.dependencies['angular-bootstrap'] = '~0.13.4';
    bowerJson.dependencies['angular-ui-router'] = '~0.2.15';
    bowerJson.dependencies['bootstrap-css-only'] = '~3.3.5';
    bowerJson.dependencies['lodash'] = '~3.10.1';
    bowerJson.dependencies['moment'] = '~2.10.6';
    bowerJson.dependencies['angular-ui-utils'] = '~3.0.0';
    this.fs.writeJSON('bower.json', bowerJson);
},
```

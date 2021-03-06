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

## User Interactions

### yosay

> npm install yosay chalk --save

Use it to welcom message etc... :

```
this.log(yosay('Welcome to ' + chalk.yellow('YANG (Yet Another Angular)') + ' generator!'));
```

### arguments

```
constructor: function(){
    generators.Base.apply(this, arguments);
    
    this.argument('appname', { type: String, required: true }); // define argument
    this.appname = _.kebabCase(this.appname); // convert argument's value
},
```

### options

```
constructor: function(){
    generators.Base.apply(this, arguments);
    
    this.option('includeutils', {
       desc: 'Optionally includes Angular-UI Utils library.',
       type: Boolean,
       default: false 
    });
},
```

```yo yang PawcioApp --includeutils``` - argument & option usage (yang is generator name)
```yo yang --help``` - prints help with options & arguments info

### prompts

```
var done = this.async(); // waiting for prompts to complete

// define two prompts: 1) string 2) checkbox
this.prompt([
    {
        type: 'input',
        name: 'ngappname',
        message: 'Angular App Name (ng-app)',
        default: 'app'
    },
    {
        type: 'checkbox',
        name: 'jslibs',
        message: 'Which JS libraries would you like to include?',
        choices: [
            {
                name: 'lodash',
                value: 'lodash',
                checked: true
            },
            {
                name: 'Moment.js',
                value: 'momentjs',
                checked: true
            },
            {
                name: 'Angular-UI Utils',
                value: 'angularuiutils',
                checked: true
            }
        ]
    }], function (answers) {
        this.log(answers);
        this.ngappname = answers.ngappname;
        this.includeLodash = _.includes(answers.jslibs, 'lodash');
        this.includeMoment = _.includes(answers.jslibs, 'momentjs');
        this.includeAngularUIUtils = _.includes(answers.jslibs, 'angularuiutils');
        done();
}.bind(this));
```

## Configuration & dependencies

### Storage API with propmts

Storage API enables to save previous answers for prompts (it can be used later when rerunning generator)

```
this.prompt([{
    type: 'input',
    name: 'ngappname',
    message: 'Angular App Name (ng-app)',
    //default: 'app' - default without storage API
    // explicit usage of storage API
    default: this.config.get('ngappname') || 'app'
    //store: true - (implicit usage of storage API)
},
```

### Dependencies

Installs can be executed with separate commands ```bower/npmInstall``` or together. ```skip-install``` can be used to configure based on yo argument ```--skip-install```:

```
install: function(){
    //this.bowerInstall();
    //this.npmInstall();
    this.installDependencies({
        skipInstall: this.options['skip-install']
    });
}
```

### Generator Composition

It can be used to delegate work to other generators (```composeWith```). Sample will use ```generator-common```:

```
git: function(){
    //this.copy('gitignore', '.gitignore');
    this.composeWith('common', {
       options: {
           'skip-messages': true,
           gitignore: true,
           gitattributes: true,
           jshintrc: false,
           editorconfig: false,
           'test-jshintrc': false
       } 
    });
},
```

## Building a sub-generator

1. Proper folder structure: Create a folder for the sub-generator. Folder's name is the name of the sub-generator.
2. Create ```index.js``` for the sub-generator. Write sub-generator like regular generator
3. Call it with ```yo <generator-name>:<sub-generator-name> [params]```
4. Add ```templates``` subfolder for templates, e.g. put here file template with placeholders:
    ```
    (function () {
        'use strict';
    
        angular.module('<%= appName %>').controller('<%= ctrlName %>', <%= ctrlName %>);
    
        <%= ctrlName %>.$inject = [];
    
        /* @ngInject */
        function <%= ctrlName %>() {
            /* jshint validthis: true */
            var vm = this;
    
            activate();
    
            ////////////////
    
            function activate() {}
        }
    })();
    ```
5. Adding options:
```
    constructor: function () {
        generators.NamedBase.apply(this, arguments);
        console.log('inside ngc sub-generator', this.name);
        
        this.option('view', {
            desc: 'Determines if view is created along with controller',
            type: Boolean,
            default: false
        });
    },
```

## Testing generators

Test structure: add ```test``` folder to generator's root and simply write tests!:
- test file creation
- test file content

```
'use strict';
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;


describe('yang:app', function(){
   describe('default', function(){
       before(function(done){
           helpers.run(path.join(__dirname, '../app'))
                .withArguments(['MyCoolApp'])
                .withOptions({ skipInstall: true })
                .on('end', done);
       });
       
       it('creates files', function(){
           assert.file([
               'package.json',
               'src/app/app.js',
               '.bowerrc',
                '.gitignore',
                '.jshintrc',
                'bower.json',
                'gulp.config.js',
                'gulpfile.js'
           ]);
       });
       
       it('adds default ngapp', function(){
           assert.fileContent('src/app/app.js', /angular.module\('app'/);
       });
   });
   
   describe('ngapp prompt', function(){
       before(function(done){
           helpers.run(path.join(__dirname, '../app'))
                .withArguments(['MyCoolApp'])
                .withOptions({ skipInstall: true })
                .withPrompts({ ngappname: 'fooBarApp' })
                .on('end', done);
       });
       
       it('injects custom ngappname', function(){
           assert.fileContent('src/app/app.js', /angular.module\('fooBarApp'/);
           assert.fileContent('src/index.html', /<html ng-app="fooBarApp">/);
           assert.fileContent('src/app/home/home.controller.js', /angular.module\('fooBarApp'\).controller\('HomeCtrl', HomeCtrl\);/);
           
       });
   });
});
```

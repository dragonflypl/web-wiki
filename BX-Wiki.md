# Gulp #

Gulp is a JavaScript runner. We use it to automated development tasks like static code analysys, improve code quality, minification etc.

Some useful Gulp plugins are:

- gulp-load-plugins
- gulp-ng-annotate
- gulp-jshint

## Basic folder structure ##

    /app - application files
    /content - assets
    /scripts - vendor scripts
    /test - tests

#### By Type ####

    /app
     /controllers
     /views
     /services
     /widgets
     /layout

Works for really small applications.

#### By Feature ####

    /app
     /dashboard
     /layout
     /people
     /admin

Works for medium and bigger applications. This approach naturally groups files into modules.

#### Other ####

Why not, just justify it and be consistent (LIFT):

- L: Locatting code should be easy
- I: Idenfiying the file (what is its content) should be easy (eg. one controller per file, first lines of the file should describe its purpose)
- F: Make folder structure as flat as possible
- T: Try to stay DRY (eg. if files are in views folder, don't name the files with -view suffix)

## Naming convention ##

#### Naming controllers ####
- simply by a feature (no prefix, suffix on filename/controller name): Dashboard, Admin, Users etc. and let the file identify that its content has a controller (preferred)
-  suffix a controller and/or file name (not preferred)
-  use **Pascal Casing** eg **D**ashboard, **L**eadOffering as controller's function is a constructor function (each time a controller is needed, a new instance is created)

#### Naming factories ####
- use Camel Casing
- same file name as factory name

#### Naming directives ####
- use Camel Casing
- same file name as directive name
- use common prefix for application/library specyfic directives (eg. **cip-**label, **bx-**form)

File names can be written with snake case or camel case. Or other, just be consistent and make files names descriptive.

> In AngularJS, in case of naming conflict, last wins. So think when naming your components (services, factories, directives etc) about potential conflicts, and try to use names that are unique. One way to achieve it, is to prefix the names with module abbreviation, eg. for module bixbite use **bx**Logger.
> 
## Modules ##

For insight on Angular modules visit:

- [https://docs.angularjs.org/guide/module](https://docs.angularjs.org/guide/module "https://docs.angularjs.org/guide/module")
- [http://henriquat.re/modularizing-angularjs/modularizing-angular-applications/modularizing-angular-applications.html](http://henriquat.re/modularizing-angularjs/modularizing-angular-applications/modularizing-angular-applications.html "http://henriquat.re/modularizing-angularjs/modularizing-angular-applications/modularizing-angular-applications.html")
- [https://blog.safaribooksonline.com/2014/03/27/13-step-guide-angularjs-modularization/](https://blog.safaribooksonline.com/2014/03/27/13-step-guide-angularjs-modularization/ "https://blog.safaribooksonline.com/2014/03/27/13-step-guide-angularjs-modularization/")


One approach is to create one, single module per app. Other is to create modules for each logical part (eg. feature) - which is preferable. Think of modules as a namespace containers for AngularJS components, that are easily pluggable/injectable/reusable.

#### Naming Convention ####

Suggestet convention is to use "dot casing" eg.:

- app - main application module (or name it by application name eg. cip)
- app.controllers
- app.dashboard
- etc.

## Readable Code - Tips##

#### Registering module components ####

There are many ways of registering module components in AngularJS. For instance following example registers the component (controller) in one expression (name, dependencies, function):

    angular
        .module('app.moduleName')
        .controller('Controller', ['config', 'datacontext', function (config, datacontext) { 
           // controller's code here
        }]);

Although it works fine for simple components (small number of dependencies, short function), it becomes less readable as component "grows". As a result, this is the recommended approach (Register, Inject, Function):

    angular
        .module('app.moduleName')
        .controller('Controller', Controller);

    Controller.$inject = ['dep1', 'dep2'];

    function Controller(dep1, dep2) { 
       // controller's code here
    }

This approach has a few advantages:

- component's registration (in this case: controller) is easily readable and identifiable
- as components dependencies grow in number, specyfing them as separate array assigned to $inject property is more readable
- components function is less indented and more identifiable
- injection list is next to function so it is easy to compare both injection list and function arguments

> Specyfing dependencies with $inject (or as an array) is required if we use minification tools

Another approach is to use **ngInject** and **gulp-ng-annotate** and move injection to build tool (Gulp)
 
### TODO: ###

- https://github.com/angular/angular-hint
- add route exception handling (ng-demos, routehelper.js)
- have a look at https://github.com/johnpapa/angularjs-styleguide and use it to create a bx styleguide
- https://github.com/toddmotto/angularjs-styleguide
- start using https://github.com/olov/ng-annotate

# Angular CLI

## Motivation

- consistent tooling for building / deploying / testing
- enforcing styleguides with linting
- helper generators for components

## Installation

> npm install -g @angular/cli

Once installed, `ng` command is available e.g. `ng build`

## Generate new app

> ng new {appName} 

Flags:

- --dry-run
- --skip-install
- --prefix
- --skip-git
- --style
- --routing

### .angular-cli.json

To work with GOM change: 

- "root" from "src" to "src/main/client" or basically whole Angular CLI output should be in "src/main/client"
- "outDir" - it should point to target directory
- "prefix" - this value is used to prefix all application components e.g. gpe-file-upload

This file contains settings for current project. Changing the settings can be also done with 

`ng set` command. When used with `-g` flag , it will generate `.angular-cli.json` file in home directory
that will be used by all projects:

> ng set defaults.styleExt scss -g

### Linting

> ng lint

Check out linting flags like: 

- --fix
- --format stylish

### Generating components & directives & services

Use:

> ng g c {name} --inline-template --inline-style

> ng g d {name} --inline-template --inline-style

it will generate only one file!

Directives / components are automatically added to declarations on closest module.

For services:

> ng g d {name} -m {modulename} --flat false

we need o specify modulename where service will be registered as provider by the wizard, or we can do it later.

To have a consistent flag settings across project you can use `ng set ...` e.g.:

> ng set defaults.service.flat false

> ng set defaults.styleExt scss

### Routing

Not all modules require routing features. By default, if you generate module, no routing features are generated. But, when routing is needed use `--routing` flag (works for `ng new` and `ng g m`)

It will 

### Tests

Unit tests (spec files) are placed along with production code by default. And we will not modify this, why?:

- as Angular architecture is component based, we'll have more small components (hopefully) and having test files next to components will make it easier to write test and reason about what is tested
- the same linting / coding style will be applied by default to test code as for production code
- if by default each component / service / pipe has its own spec file, spec files will become smaller. In GOM solutions, spec files had tendency to grow large and contain tests for many directives/controllers etc.

`ng test` automatically executes all `*.spec.ts` files.

#### Testing in isolation

By default, angular compiler (probably) complains about unrecognized components in templates.

To ignore these errors, use `schemas: [ NO_ERRORS_SCHEMA ]` option in test module. This way, there's no
need to include unknown components into the tests.

Flags worth noting are:

- --code-coverage / cc
- --single-run / sr
- --progress
- --sourcemaps
- --watch

### Building & serving

By default `ng serve` uses webpack's inmemory feature - everything is bundled and server from memory.

Doing `ng build` creates development build. It the can be explored with, for instance, with `source-map-explorer`.

#### Build environments & targets

- environments enable customization of application runtime
- targets determine if build is optimized or not

`ng build / ng build --dev` vs `ng build --prod` is doing dev vs prod build.

`--dev` is shorthand for `--target=development` and `--prod` is for `--target=production`.

As for serving... `ng serve` it has two cool features (apart from these available for `ng build`): 

- --ssl
- --proxy-config

#### Including scripts / styles

Additional scripts / styles can be included inside cli config file in scripts / styles section.

#### Total customization

With `ng eject`.

## Open questions

- what is angular compiler & ahead of time compilation
- what 



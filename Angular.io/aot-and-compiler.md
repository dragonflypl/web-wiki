# Compiler

`<button (click)="fetchData()">foo</button>` - Angular, as a framework, needs to register a DOM event listener for the ‘click’ event and call the ‘fetchData()’ method of the Component class when the event happens. Before it can do so, Angular needs to parse the HTML template and make sense out of the syntax — that step of interpreting the template is performed by the Angular compiler.


- Angular 1.x change detection & rendering code was dynamic & generic (could work with any directive). No way of optimizing by VMs
- In Angular 2+ compiler generates VM-friendly code at runtime (JIT) of build time (AOT) for each individual component

What needs to be compiler? **Templates** of components into JavaScript classes. These classes have methods for change detection in the bindings and rendering the user interface.

Compilation can take place at runtime (i.e. in the browser) or build-time (part of build process).

## JIT flow

- Development of Angular application with TypeScript.
- Compilation of the application with tsc.
- Bundling.
- Minification.
- Deployment.
- In the browser
  - Download all the JavaScript assets.
  - Angular bootstraps.
  - Angular goes through the JiT compilation process, i.e. generation of JavaScript for each component in our application.
  - The application gets rendered.

## AOT flow

- Development of Angular application with TypeScript.
- Compilation of the application with ngc.
  - Performs compilation of the templates with the Angular compiler and **generates (usually) TypeScript.**
  - Compilation of the TypeScript code to JavaScript.
- Bundling.
- Minification.
- Deployment.
- In the browser
  - Download all the assets.
  - Angular bootstraps.
  - The application gets rendered.

Because in AOT flow, compilation is done to TypeScript, we get all the features of the language before compiling to JavaScript (e.g. checking if template is using property from the component that does not exist!).

## AOT Output

- .ngfactory.ts : 
- .css.shim.ts : CSS for the component
- .metadata.json : metadata, we can think of it as a JSON representation of the objects passed to `@Component` or `@NgModule` decorators


## AOT and metadata files / third-party modules

The compiler needs metadata for the components in order to compile their templates (it's . Lets suppose that in our application we use a thrid-party component library. How does the Angular AoT compiler knows the metadata of the components defined there if they are distributed as plain JavaScript? It doesn't. In order to be able to do ahead-of-time compilation of an application, referencing an external Angular library, the library needs to be distributed with the \*.metadata.json produced by the compiler.

Here's a full explanation: http://blog.mgechev.com/2016/08/14/ahead-of-time-compilation-angular-offline-precompilation/ (AoT vs JiT - development experience)

## Tree-shaking

> https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80 

Since templates are JavaScript/TypeScript we know what and where is used. This allows to perform **tree-shaking**, i.e. drop all components/modules that are not used by the application out of the production bundle.

# AOT

Intro: https://www.youtube.com/watch?v=kW9cJsvcsGo

Docs: https://angular.io/guide/aot-compiler

Why?

- Less code generated in the production bundle (tree-shaking / no compiler)
- Faster rendering (compilation already done once during build)
- Faster execution (taking advantage of the inline caching mechanism of the JavaScript Virtual Machines)
- Compile time syntax checking 
- Improved Security (no eval, don't need to worry about contentSecurityPolicy)
- Energy savings


## Performance

- page load
- *switching to route* - destroy everything and create everything
- update values

## Performance "inputs"

- Component metadata & templates. Contain:
  - `selector`
  - `{{}}`
  - `[]`, `()`
- Directive metadata. Contain:
  - `selector`
  - directive dependencies
  - and more @Input, @Output, @Pipe

And now, everything has to go through the compiler.

To understand the inputs, parsing is done. Parser builds a tree, called `AST` - `Abstract syntax tree`.

`AST` contains detailed information about the template, e.g. line numbers of expressions. Benefit: meaningful runtime errors.

Now, `AST` needs to be brought to life - i.e. HTML has to be created. Steps (how compiler evolved):

1. Generat JavaScript code that is converting `AST` into DOM nodes that can be easily accessible. Angular uses `createElement/createTextNode`. That code contains abstractions for Bindings, Directives, Elements, View (whole template). But this approach was as fast as Angular 1.
2. Basic `ngc` implementation had data structures that could be optimized (`Map` etc...). Instead of having a code that is dynamic (loops, arrays, maps, sets), generated code was static (plenty of if statements, plenty of fields etc.), and this code can be optimized really good my JavaScript VMs (google for Hidden Classes topic). So instead of having data structures, `ngc` generates only properties for expressions, directives, nodes (fast property access everywhere)

This finishes topic of JIT compilation (compilation in the browser). Drawbacks:

- parsing takses place in the browser, so compiler code must be in the browser
- compiler generates code that needs to be evaluated with `eval` which is bad


Now it is where AOT compilation kicks in.

1. Parsing and compilation is happening on the server - no parser is required in the browser
2. Ehnanced minification is possible (minify even property names)
3. Browser gets compiled code (views) via regular `script` tags.
4. AOT on the server generates TypeScript. Therefore, everything it type checked (e.g. if template is using properties that exist on component)

There're some metadata files generated in the process... (still don't know what for `*ngsummary.json`

Bottom line: `*.ngfactory.ts` files are generated.


# Creating AOT libraries

## Prerequisites

- ngc (wrapper around typescript compiler , `@angular/compiler-cli`)
- type definitions d.ts
- metadata.json

This is official proposal: https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit and great speech that covers everything (from ngc to rollup and FESM):
https://www.youtube.com/watch?v=unICbsPGFIA


> \*.metadata.json — metadata associated with the current component (or NgModule). It is kind of JSON representation of the objects we pass to the @Component, @NgModule decorators. This file contains the information that project’s (not library’s) NGC will need that was in the original library \*.ts files but was not included in the \*.d.ts files.

> “All libraries must include the \*.metadata.json file along side any \*.d.ts files they produce otherwise they will not work correctly with ngc. If we don’t have that information we cannot generate the factories for the library”. 

> Angular Compiler needs metadata for the components in order to compile their templates. Lets suppose that in our application we use a third-party component library. How does the Angular AoT compiler knows the metadata of the components defined there if they are distributed as plain JavaScript? It doesn’t. In order to be able to compile ahead-of-time an application, referencing an external Angular library, the library needs to be distributed with the \*.metadata.json produced by the compiler. 

> tl;dr: If a published package doesn’t contain .metadata.json files, they are incompatible for AoT compilation. 

> tl; dr; When an application compiles ahead of time, all libraries used by the app must also be AOT compliant. 

> tl; dr; Include \*.metadata.json files in your npm package. All referenced libraries must include the \*.metadata.json file along side any \*.d.ts files they produce... The application that is going to use your library will generate factories itself, based on your metadata (`"skipTemplateCodegen": true`).

If your published library (published means, it was compiled with `tsc` and it is no longer in TypeScript, it has only js/sourcemap & d.ts files) is used by an Angular 4 application, and that application is using AOT then it needs to be compiled with `ngc`. Why? `ngc` generates additional `*.metadata.json` file during transpilation. If this file is missing, everything will work fine, until `--aot` compilation is used. So what to do... Here's a sample scenario:

## tsconfig-ngc.json

Create `tsconfig-build.json` with special configuration for `ngc` (`ngc` is using this file) that will be used when library is being published to npm.

- This answers the question about `emitDecoratorMetadata` and `experimentalDecorators` - basically enable it to have decorators support.
https://www.typescriptlang.org/docs/handbook/decorators.html - 

Here's sample configuration:

```
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "sourceMap": true,
        "moduleResolution": "node",
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        /*
            Creates type definitions for the compiled files d.ts
        */
        "declaration": true,
        "lib": [
            "es2015",
            "dom"
        ],
        "outDir": "./lib",
        "stripInternal": true
    },
    "exclude": [
        "node_modules"
    ],
    /*
        Array of files to be compiled, in our case is our entry file. Entry file is enough - compiler will follow imports.
    */
    "files": [
        "./src/swiper.module.ts"
    ],
    /*
        Compiler options for ngc (angular compiler)
    */   
    "angularCompilerOptions": {
        /*
            Don't produce .metadata.json files (they don't work for bundled emit with --out)
        */
        "skipMetadataEmit": false,
        /*
            Produce an error if the metadata written for a class would produce an error if used.
        */
        "strictMetadataEmit": true,
        /*
            This setting specifies if *.ngfactory.ts / .css.shim.ts & / .ngsummary.json / .ngstyle.ts are generated.
            They are not needed to be included in published package.
        */
        "skipTemplateCodegen": true,
        /* 
            This setting affects *.ngfactory.ts & *.ngsummary.json files and where these are generated.
            (only if skipTemplateCodegen: false)
        */
        "genDir": "ngc-out"
    }
}
```
It seems that "typings" property in `package.json` is not needed (in some packages it points to main d.ts file)

## Other features

### Analyzing bundles

`npm install -g source-map-explorer` & `source-map-explorer dist/main.bundle.js dist/main.map` will launch the browser and show what files are included.

> https://medium.com/@laco0416/try-angular-2-aot-compilation-ff5761a657c

Or use `ng build --prod --stats-json` along with `npm install --save-dev webpack-bundle-analyzer`

> https://coryrylan.com/blog/analyzing-bundle-size-with-the-angular-cli-and-webpack

### TypeScript support

Note that the "typings" field is synonymous with "types" (in package.json), and could be used as well:

```
{
    "name": "awesome",
    "author": "Vandelay Industries",
    "version": "1.0.0",
    "main": "./lib/main.js",
    "types": "./lib/main.d.ts"
}
```

Also note that if your main declaration file is named index.d.ts and lives at the root of the package (next to index.js) you do not need to mark the "types" property, though it is advisable to do so.

#### Including @types as dependencies

Make sure all the declaration packages you depend on are marked appropriately in the "dependencies" section in your package.json. For example, imagine we authored a package that used Browserify and TypeScript.

```
{
    "name": "browserify-typescript-extension",
    "author": "Vandelay Industries",
    "version": "1.0.0",
    "main": "./lib/main.js",
    "types": "./lib/main.d.ts",
    "dependencies": [
        "browserify@latest",
        "@types/browserify@latest",
        "typescript@next"
    ]
}
```

Here, our package depends on the browserify and typescript packages. browserify does not bundle its declaration files with its npm packages, so we needed to depend on @types/browserify for its declarations. typescript, on the other hand, packages its declaration files, so there was no need for any additional dependencies

Our package exposes declarations from each of those, so any user of our browserify-typescript-extension package needs to have these dependencies as well. For that reason, we used "dependencies" and not "devDependencies", because otherwise our consumers would have needed to manually install those packages. 

> Copied from https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html
### Being tree-shakable

In order to achieve it, in distribution file ES2015 modules (esm) must (not sure if this is imperative, why not `commonjs`) be used: `"module": "es2015"`. Having that, bundlers like WebPack / Rollup can do treeshaking by getting rid of unused exports.

### UMD Bundle

Developers should be able to use them as easy as possible in development mode, i.e. no transpilation of any kind should be required. So provide two versions: one that uses es6 modules and second with UMD format

```
  "main": "ngresizable.bundle.js",    // reference to ES5 UMD bundle
  "module": "ngresizable.module.js",  // reference to esm entry file. Rollup / Webpack will use this field
```

How to produce UMD bundle? `Rollup` can be used.


### Providing type definitions

Just set `"declaration": true` in ts config & `"types": "ngresizable.module.d.ts" in `package.json`

# FAQ

- Does `ng` perform treeshaking? Yes it does.

- How can I publish to npm? Additional `package.json` entry is needed:

```
"publishConfig": {
  "registry": "http://MY-REPO-URL/"
}
```

and use `npm publish`:

```
npm config set registry <registry url> // not sure this is needed
npm login // not sure this is needed
npm publish
```

- How can I test publishing to npm
  - use `npm pack` along with `prepare` script e.g. (it will generate `tgz` with stuff that would be published)

```
    "a2-clear-build": "rimraf lib",    
    "a2-build": "ngc -p ./tsconfig-ngc.json"
    "prepare": "npm run a2-clear-build && npm run a2-build",
```

What is more, this package can be later installed with `npm install [LIBRARY_NAME]-[LIBRARY_VERSION].tgz` (move the `tgz` to application).

- Does `ng build` does `aot`?
  - no it does not by default. Add `--aot` flag or `ng build --prod` . You can also use `--aot` with `ng serve`

# Rollup

https://medium.com/@cyrilletuzi/how-to-build-and-publish-an-angular-module-7ad19c0b4464 - sample configuration

# Reference

- https://github.com/angular/angular/blob/master/tools/%40angular/tsc-wrapped/src/options.ts - ngc options documentation

## Creating libraries

- https://github.com/trekhleb/angular-library-seed - library seed
  - https://medium.com/@trekhleb/how-to-create-aot-jit-compatible-angular-4-library-with-external-scss-html-templates-9da6e68dac6e
  - tells how to create a library that has all features (rollup, umd, metadata.json etc)  
- http://blog.mgechev.com/2017/01/21/distributing-an-angular-library-aot-ngc-types - based on ngresizable , uses rollup as well. Explains how different types of bundles can be produced (esm & umd) and package.json structure
- https://medium.com/@mohuk/publishing-aot-compliant-angular-2-packages-eb188ab5635 - short but ok
- http://dbarnes.me/writing-an-aot-compliant-angular-library/ - fresh
- https://medium.com/@isaacplmann/getting-your-angular-2-library-ready-for-aot-90d1347bcad - a bit old
- https://github.com/Nolanus/ng2-page-scroll - another proper project
- https://github.com/mgechev/ngresizable - another proper project with rollup
- ng-logger - another sample library that is nicely packaged
  - https://github.com/noemi-salaun/ng-logger
  - what is more, it uses rollup etc, this is a (probably) complete example of using everything correctly
- angular2-useful-swiper
  - https://github.com/Useful-Software-Solutions-Ltd/angular2-useful-swiper
  - https://www.usefuldev.com/blog/post/using-ngc-to-build-an-angular-2-library-project
- https://medium.com/@OCombe/how-to-publish-a-library-for-angular-2-on-npm-5f48cdabf435 - old, some mistakes

## Angular Compiler

- https://www.youtube.com/watch?v=_VnV7R4Ncwc - how app size shrinks with angular AoT & treeshaking
- https://medium.com/spektrakel-blog/angular2-going-production-ready-with-ahead-of-time-compilation-aot-developer-experiences-aebaa0228909 - real-world example of delivering AoT app
- https://www.youtube.com/watch?v=kW9cJsvcsGo
- https://www.youtube.com/watch?v=RXYjPYkFwy4
- http://blog.mgechev.com/2016/08/14/ahead-of-time-compilation-angular-offline-precompilation/ - pure theory, awesome!

## TODO

- https://github.com/steveblue/angular2-rollup
- https://medium.com/@isaacplmann/if-you-think-you-need-the-angular-2-runtime-jit-compiler-2ed4308f7515
- https://medium.com/@isaacplmann/making-your-angular-2-library-statically-analyzable-for-aot-e1c6f3ebedd5
- https://github.com/jvandemo/generator-angular2-library - this guy is generating a angular library
- https://www.npmjs.com/package/angular2-advanced-notifications - check out this library (Build a library compatible with Angular, AoT compilation & Tree shaking.)


Web-wiki
=========

## Learning resources

- https://css-tricks.com/learning-to-learn/ - learn how to learn:
  - https://github.com/humanwhocodes/computer-science-in-javascript : Collection of classic computer science paradigms, algorithms, and approaches written in JavaScript
  - https://github.com/prakhar1989/awesome-courses e.g. Algorithms
  - https://www.amazon.com/CSS-Definitive-Guide-Visual-Presentation/dp/1449393195/
  - https://github.com/micromata/awesome-javascript-learning
  - https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976
  
- https://wesbos.com/ - guy is doing paid/free courses e.g.
  - https://cssgrid.io/

## Awesome node / gulp
#### eslint

- https://www.npmjs.com/package/eslint-watch
- https://github.com/dustinspecker/awesome-eslint

#### gulp-print
Prints names of files to the console so that you can see what's in the pipe
#### gulp-bump
Bump any JSON file which supports semver versioning
#### gulp-ng-annotate
Add angularjs dependency injection annotations with ng-annotate
#### gulp-filter
Filter files in a vinyl stream.

Enables you to work on a subset of the original files by filtering them using globbing. When you're done and want all the original files back you just call the restore method.
#### csso
<a href=http://css.github.com/csso/>CSS-optimizer</a>
#### gulp-useref
Parse build blocks in HTML files to replace references to non-optimized scripts or stylesheets.
#### gulp-angular-templatecache
#### yargs
#### gulp-task-listing

Plugin for making help

<pre><code>gulp.task('help', require('gulp-task-listing'));
// or with gulp-load-plugins
var $ = require('gulp-load-plugins')({lazy: true})
gulp.task('help', $.taskListing)
</code></pre>

#### gulp-load-plugins

Saves gulp plugins loading code:

<pre>var $ = require('gulp-load-plugins')({lazy: true});
$.util.log("This is how to access gulp-util plugin");</pre>

#### browsersync

Plugins that speeds up development by reloading files in the browser:

<pre><code>function startBrowserSync() {
    var browserSync = require('browser-sync');
    if (browserSync.active) {
        return;
    }

    log('Starting browser-sync on port ' + port);

    gulp.watch([config.less], ['styles'])
        .on('change', function (event) {
            changeEvent(event);
        });

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: [
            config.client + '**/*.*',
            '!' + config.less,
            config.temp + '**/*.css'
        ],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0 //1000
    };

    browserSync(options);
}</code></pre>

#### wiredep / gulp-inject
#### gulp-util
Enables logging & coloring:
 <pre><code>var gutil = require('gulp-util');
gutil.log(gutil.colors.blue(msg));</code></pre>
#### node-notifier
#### gulp-browserify
#### gulp-connect - fires a server
#### gulp-if
#### gulp-minify-html
#### gulp-jsonminify

Blogs
----
* http://www.yearofmoo.com
* http://toddmotto.com/ - AngularJS / JavaScript / Web
* https://medium.com/opinionated-angularjs
* http://andyshora.com/
* http://www.jvandemo.com/ - AngularJS mostly
 * http://www.jvandemo.com/top-5-benefits-after-6-months-of-component-driven-angularjs-development/

CSS
----
#### Typography

* http://typecast.com/blog/a-more-modern-scale-for-web-typography - modern scale of font-sizes for different devices
* https://css-tricks.com/snippets/css/using-font-face/ - Using font-face
* Font's performance:
 * "FOUT": Fighting Flash Of Unstyled Text: http://www.paulirish.com/2009/fighting-the-font-face-fout/
 * Loading libraries:
   * Web Fonts Loader & https://www.filamentgroup.com/lab/font-events.html & https://github.com/bramstein/fontfaceobserver & https://github.com/typekit/webfontloader & https://github.com/zachleat/fontfaceonload

#### Other

* rem units
 * https://css-tricks.com/theres-more-to-the-css-rem-unit-than-font-sizing/ - Sample usage of rem's
* https://css-tricks.com/the-lengths-of-css/ - Summary of all length units
* vw & vh Units
 * https://web-design-weekly.com/2014/11/18/viewport-units-vw-vh-vmin-vmax/
 * http://snook.ca/archives/html_and_css/vm-vh-units
* <a href="http://css3.bradshawenterprises.com/">CSS3 Transitions, Transforms, Animation, Filters and more!</a>

Design
----
* http://www.smashingmagazine.com/
* http://design-seeds.com
* https://color.adobe.com
* https://www.google.com/fonts
* https://typekit.com/fonts
* http://fortawesome.github.io/Font-Awesome/
* https://icomoon.io
* http://fontello.com
* https://vimeo.com/68331768
* Frameworks:
 * http://semantic-ui.com/ - still waiting for 1.0 release!
 * http://foundation.zurb.com/
 * http://purecss.io/
 * http://getbootstrap.com/

## AngularJS
* AngularJS & RequireJS

---------------------------------------
- https://www.youtube.com/watch?v=4yulGISBF8w - nice presentation
- https://github.com/ThomasBurleson/angularjs-Quizzler - fully fledged application

Key points from this presentation are:
* AngularJS injects Instances whereas RequireJs injects Classes (References)
* RequireJS manages: Load & Runtime Dependency
* AngularJS manages: Construction & Module Depenedency

---------------------------------------

* http://yearofmoo-articles.github.io/angularjs-testing-article/app/#!/videos - video collection
* Styleguides:
 * http://toddmotto.com/opinionated-angular-js-styleguide-for-teams/ - Opinionated AngularJS styleguide for teams
* Articles:
 * http://solutionoptimist.com/2013/10/07/enhance-angularjs-logging-using-decorators/ - Enhancing AngularJS Logging using Decorators
 * http://blog.xebia.com/2014/08/08/extending-angularjs-services-with-the-decorate-method/ - decorators sample, decorating $q
 * https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec - Techniques for authentication in AngularJS applications
 * https://github.com/witoldsz/angular-http-auth - module for handling common auth stuff
 * [The Top 10 Mistakes AngularJS Developers Make]

### UI-Router
* https://medium.com/opinionated-angularjs/advanced-routing-and-resolves-a2fcbf874a1c 
* http://www.jvandemo.com/how-to-resolve-application-wide-resources-centrally-in-angularjs-with-ui-router/ - How to resolve application-wide resources centrally in AngularJS with ui-router
* http://www.jvandemo.com/how-to-resolve-angularjs-resources-with-ui-router/ - How to force AngularJS resource resolution with ui-router

Performance Tips
----
* [Writing efficient CSS]
* [Efficiently Rendering CSS]
* [How Bad is DOM Interaction - Really]

## JavaScript testing ##
* [Getting started with GhostDriver and PhantomJS]
* Tips & Tricks
 * http://sravi-kiran.blogspot.co.uk/2013/12/TriggeringEventsInAngularJsDirectiveTests.html - trigger events in tests
* Karma
 * http://karma-runner.github.io/0.12/dev/plugins.html - plugins 
 * Reporters
   * karma-growl-reporter & karma-jasmine-html-reporter & karma-mocha-reporter (reporter with mocha style logging - to console - can be used with Jasmine framework)
* Unit Testing
 * http://bardo.io/posts/testing-your-ui-router-configuration/ - testing states
 * http://nikas.praninskas.com/angular/2014/09/27/unit-testing-ui-router-configuration/ - ui-router testing
* Sinon
 * http://sinonjs.org/ - Standalone test spies, stubs and mocks for JavaScript.
No dependencies, works with any unit testing framework.
* Jasmine
 * http://jasmine.github.io/ 
 * https://www.npmjs.org/package/karma-jasmine - A Karma plugin - adapter for Jasmine testing framework
 * [Advanced Testing and Debugging in AngularJS]
 * [AngularJS Testing with Karma and Jasmine]
 * [Full-Spectrum Testing with AngularJS and Karma] - obsolete stuff
* E2E Testing with AngularJS and [Protractor]
 * https://docs.angularjs.org/guide/e2e-testing - Using with AngularJS
 * https://www.youtube.com/watch?v=BvAeabvZ61o - Protractor E2E testing for AngularJS, starts at 30:30
 * https://github.com/angular/protractor/blob/master/docs/tutorial.md - tutorial   
 * https://github.com/juliemr/protractor-demo - Demo project with tests for tutorial
* Test Coverage
 * http://tntim96.github.io/JSCover/

### Online tools/resoures
- https://stackedit.io - Markdown Editor that uploads to Github
- http://gethead.info/ - essential guide to what can be found / put in ```head``` tag
- http://realfavicongenerator.net/ - favicon / head / meta crossplatform generator. Generate it for all devices

#### For Bootstrap
- http://bootsnipp.com/ - snippets/components/widgets (design elements, playground and code snippets)
- http://www.bootply.com/ : The Bootstrap Playground
- http://bootswatchr.com/ - Theme roller with live preview
- http://pikock.github.io/bootstrap-magic/ - Yet another theme roller
- Themes
 - http://bootswatch.com/ - Free themes for Bootstrap, some really interesting like Paper (http://bootswatch.com/paper/)
 - http://startbootstrap.com/ - Another free themes (A collection of full, multi-page website themes and templates)
 - http://themeforest.net/item/material-design-admin-template-landing/10713818 - awesome Bootstrap Theme that looks like Material Design + it features plenty of plugins

### Other

- setting up cmd with custom init script: ```C:\Windows\System32\cmd.exe /k "C:\dev\nodevars.bat"``` + bat file:
```
@echo off

rem Ensure this Node.js and npm are first in the PATH
set PATH=%APPDATA%\npm;%~dp0;%PATH%;c:\ubs\dev\npm;C:\Program Files\nodejs

setlocal enabledelayedexpansion
pushd "%~dp0"

rem Figure out the node version.
set print_version=node.exe -p -e "process.versions.node + ' (' + process.arch + ')'"
for /F "usebackq delims=" %%v in (`%print_version%`) do set version=%%v

rem Print message.
if exist npm.cmd (
  echo Your environment has been set up for using Node.js !version! and npm.
) else (
  echo Your environment has been set up for using Node.js !version!.
)

popd
endlocal

rem If we're in the node.js directory, change to the user's home dir.
if "%CD%\"=="%~dp0" cd /d "%HOMEDRIVE%%HOMEPATH%"
```

### FAQ
- what is meta viewport and how to use it?
 - http://blog.javierusobiaga.com/stop-using-the-viewport-tag-until-you-know-ho
 - http://webdesign.tutsplus.com/articles/quick-tip-dont-forget-the-viewport-meta-tag--webdesign-5972
 - http://www.webdesignerdepot.com/2012/02/common-mobile-web-design-mistakes/
 - http://www.quirksmode.org/mobile/metaviewport/
- How to run subset of tests with protractor:
 - use --specs argument in command line tool
- Where can I find web drivers & selenium standalone server
 - http://selenium-release.storage.googleapis.com/index.html
 - http://chromedriver.storage.googleapis.com/index.html

[Protractor]:http://angular.github.io/protractor
[Getting started with GhostDriver and PhantomJS]:http://assertselenium.com/2013/03/25/getting-started-with-ghostdriver-phantomjs/
[AngularJS Testing with Karma and Jasmine]:http://www.tuesdaydeveloper.com/2013/06/angularjs-testing-with-karma-and-jasmine/
[Advanced Testing and Debugging in AngularJS]:http://www.yearofmoo.com/2013/09/advanced-testing-and-debugging-in-angularjs.html
[Writing efficient CSS]:https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS
[Efficiently Rendering CSS]:http://css-tricks.com/efficiently-rendering-css/
[How Bad is DOM Interaction - Really]:http://andyshora.com/how-bad-is-dom-interaction-javascript.html
[The Top 10 Mistakes AngularJS Developers Make]:https://www.airpair.com/angularjs/posts/top-10-mistakes-angularjs-developers-make

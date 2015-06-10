Web-wiki
=========
## Awesome node / gulp
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
* vw & vh Units
 * https://web-design-weekly.com/2014/11/18/viewport-units-vw-vh-vmin-vmax/
 * http://snook.ca/archives/html_and_css/vm-vh-units
* <a href="http://css3.bradshawenterprises.com/">CSS3 Transitions, Transforms, Animation, Filters and more!</a>

Design
----
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
### UI-Router
* http://www.jvandemo.com/how-to-resolve-application-wide-resources-centrally-in-angularjs-with-ui-router/ - How to resolve application-wide resources centrally in AngularJS with ui-router
* http://www.jvandemo.com/how-to-resolve-angularjs-resources-with-ui-router/ - How to force AngularJS resource resolution with ui-router

Performance Tips
----
* [Writing efficient CSS]
* [Efficiently Rendering CSS]
* [How Bad is DOM Interaction - Really]


## AngularJS
* http://yearofmoo-articles.github.io/angularjs-testing-article/app/#!/videos - video collection
* Styleguides:
 * http://toddmotto.com/opinionated-angular-js-styleguide-for-teams/ - Opinionated AngularJS styleguide for teams
* Articles:
 * https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec - Techniques for authentication in AngularJS applications
 * https://github.com/witoldsz/angular-http-auth - module for handling common auth stuff
 * [The Top 10 Mistakes AngularJS Developers Make]

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

#### For Bootstrap
- http://bootsnipp.com/ - snippets/components/widgets (design elements, playground and code snippets)
- http://www.bootply.com/ : The Bootstrap Playground
- http://bootswatchr.com/ - Theme roller with live preview
- http://pikock.github.io/bootstrap-magic/ - Yet another theme roller
- Themes
 - http://bootswatch.com/ - Free themes for Bootstrap, some really interesting like Paper (http://bootswatch.com/paper/)
 - http://startbootstrap.com/ - Another free themes (A collection of full, multi-page website themes and templates)
 - http://themeforest.net/item/material-design-admin-template-landing/10713818 - awesome Bootstrap Theme that looks like Material Design + it features plenty of plugins
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

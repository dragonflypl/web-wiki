Web-wiki
=========
Blogs
----
* http://www.yearofmoo.com
* http://toddmotto.com/ - AngularJS / JavaScript / Web
* https://medium.com/opinionated-angularjs
* http://andyshora.com/
 
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

Performance Tips
----
* [Writing efficient CSS]
* [Efficiently Rendering CSS]
* [How Bad is DOM Interaction - Really]

## Bower
#### Configuration
* .bowerrc - it is Bower (as a tool) configuration file. Used to:
 * configure the name of the folder were Bower installs packages:
```
{
 "directory": <directory-name>
}
```

* bower.json - purpose is two-fold:
 * contains meta-data about the package, that is used when package is published with Bower
 * keeps track of packages installed/referenced using bower (dependencies/devDependencies). Dependencies can be installed using:
```
bower install
```
Bower will install all packages that are not yet installed.

#### Commands
* Install packages specified in bower.json:
```
bower install
```

* Install package (use with --save|--save-dev flags to save changes to bower.json):
```
bower install <package-name>
```
* Uninstall package (use with --save|--save-dev flags to save changes to bower.json):
```
bower uninstall <package-name>
```
* Install specyfic version of a package:
```
bower install <package-name>#<version>
```
* Find out what versions of the package are available:
```
bower info <package-name>
```
* Update all packages
```
bower update
```
* Update single package
```
bower install <package-name>
```
* List all installed packages
```
bower list
```
* Search for package
```
bower search <to-find>
```
* View package's GIT url
```
bower lookup <package-name>
```
* Do clean up of packages that are not listed in bower.json (direct/indirect dependencies)
```
bower prune
```

##### Bower's install options
* Install only regular dependencies, without devDependencies
```
bower install --production
```
* Install package into custom directory
```
bower install <dir-name>=<package-name>
```

##### Bower's cache
Bower uses its cache before fetching packages.
* List cache entries
```
bower cache list
```
* Clean cache
```
bower cache clean
```


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
   * karma-growl-reporter & karma-jasmine-html-reporter
* Unit Testing
 * http://bardo.io/posts/testing-your-ui-router-configuration/ - testing states
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

### FAQ
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

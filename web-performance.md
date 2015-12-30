# Performance
## HTTP Caching

- https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching
- https://devcenter.heroku.com/articles/increasing-application-performance-with-http-cache-headers

## Web Performance Optimization 

You can't optimize what you can't measure.

Navigation Timing API to the rescue. This link has code snippet that does measurement: https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp?hl=en .

Another sample of User Timing API (http://www.html5rocks.com/en/tutorials/webperformance/usertiming/) :
``` javascript
window.performance.mark("mark_end_resize");
window.performance.measure("measure_pizza_resize", "mark_start_resize", "mark_end_resize");
var timeToResize = window.performance.getEntriesByName("measure_pizza_resize");
console.log("Time to resize pizzas: " + timeToResize[0].duration + "ms");
```

### UDACITY Browser Rendering Optimization Course

- https://www.udacity.com/course/browser-rendering-optimization--ud860 - course itself

#### Making single frame

Typical frame: 

```JavaScript (or CSS Animations or Web Animation API) -> Style -> Layout -> Paint -> Composite```. 

Three possible paths are:

1. All steps
2. JavaScript -> Style -> Composite
3. JavaScript -> Style -> Paint -> Composite (no geometry changes thus layout is not needed)

**Rasterizer** - step that turns Vector into Raster i.e. turns Layout into pixels. Tools will show this as **Paint** event.

**Composite Layers** - event for a process of handling layers. Finally when layers are done (this whole process is done on CPU) they will be uploaded to GPU and GPU will put them on the display.

**Layout boundaries**: usually changes in layout affect whole document. But it is possible to optimize it, here's some in-depth info: http://wilsonpage.co.uk/introducing-layout-boundaries/ .

#### Application Lifecycle from Rendering perspective

**RAIL** - Response, Animations, Idle, Load:
- L (1sek): should be preety quick, like 1s in total. After load is done, app is ini idle
- I (50ms): idle blocks are usually 50ms long, but there can multiple idle blocks in one go. This is prefect place to do jobs that were defered during Load phase in order to make it quick (so called post-load idle state). It is crucial to keep post-load performed tasks to 50ms, as user actions can happen during post-load idle state (we have 100ms to respond to user actions!).
- Response (100ms): by response we mean that application reacts to users actions (simple change, like toggling a checkbox) within 100ms (study show this is a threshold of good UX)
- Animate (16ms): if user's action requires animation we need 60fps

#### Optimizing Javascript

- Migrate to WebWorkers
- Use requestAnimationFrame
- Avoid **Forced Synchronus Layout / Additional reflows** - it occurs when you ask the browser to run Layout first inside JavaScript section and then recalculate styles & run Layout again. http://gent.ilcore.com/2011/03/how-not-to-trigger-layout-in-webkit.html
- Prevent Layout Trashing:
 - https://blog.idrsolutions.com/2014/08/beware-javascript-layout-thrashing/
 - http://blog.fogcreek.com/we-spent-a-week-making-trello-boards-load-extremely-fast-heres-how-we-did-it/
 - http://wilsonpage.co.uk/preventing-layout-thrashing/
- minimize repain & reflow: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/

> A repaint occurs when changes are made to an elements skin that changes visibility, but do not affect its layout (e.g. background color).

#### Optimizing CSS

- use BEM (or other approach for fast CSS selectors)
- measure selector performance

``` javascript
  var selectors = [
    "div.box:not(:empty):last-of-type .title",
    ".box--last > .title-container > .title",
    ".box:nth-last-child(-n+1) .title"
  ];

  selectors.forEach(function(s) {
    console.time(s);
    var d = document.querySelector(s);
    console.timeEnd(s);
    console.log(d);
  });
```

- reduce number of affected elements : fewer changes to render tree
- reduce selector complexity : use fewer tags & class names to select elements

#### Optimizing Layers

There're two events associated with layers: 
- Upadte Layer Tree - figures out layers for the page. It looks at the styles of the elements and decides the order of layers and how many layers are needed
- Composite Layer - browser is putting the page together to send to the screen

The more layers on the page, the more time will be spend on layer management & compositing. There's a trafeoff between reducing paint time and increasing layer management time.

Layers are automated process by the browser and nomally nothing has to be done. However, if app is struggling with Paint issue, it's time to consider promoting element to its own layer.

To promote element to its own composited layer use two hacks:
- will-change: transform (or any other visual property)
- transform: translateZ(0)

Promoting elements to layers can be beneficial for avoiding paint problems, especially those related to movement or opacity changes. But changing visual property like text color or shadows, this trick won't help. Update layer tree should not be more than 2ms & 2ms for compositing.

#### Layers in depth

I had some problems with understanding the concept. This one helped me: https://engineering.gosquared.com/optimising-60fps-everywhere-in-javascript - and in particular this quote 

> In this example, the transform forces the browser to place each of the div elements into its own layer on the GPU before compositing them together for displaying on the screen. Now for each frame, the only work is in calculating the new position for each layer, which takes barely any computation power at all. There is no work done in recalculating the box shadows or background gradients – the pixels do not change within their layers, so there are no “Paint” events in the timeline, only “Composite Layers”.

> It’s worth noting also that if you’re aiming for smooth animations on mobile devices, you should aim wherever possible to only animate properties like transform and opacity that can be animated entirely using GPU acceleration. Mobile devices’ processors are, as a rule, pretty terrible in comparison to their GPUs. As a result it’s best to avoid animating width or height or other such properties. With a little extra effort it’s usually possible to (for example) animate an element’s transform inside another element with overflow: hidden to achieve the same effect as changing its dimensions.

> For smooth animation, it’s important to ensure that any re-paints are as efficient as possible. This means avoiding animating any properties that are expensive for the browser to draw, such as box shadows or gradients. It’s also important to avoid animating elements which have these properties, or any that will cause a re-paint of regions heavy with these effects.

On layers:
- http://blog.atom.io/2014/07/02/moving-atom-to-react.html

#### Optimizing Animations
- minimize number of Layout/Paint events

#### Resources

**BEM** : Block Element Modifier. Approach to create clean/effective/portable components (with fast css selectors that are advantageous to performance):
- http://www.sitepoint.com/bem-smacss-advice-from-developers
- https://en.bem.info/method/key-concepts
- http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/
- http://mathayward.com/modular-css-with-sass-and-bem/

**http://jankfree.org/** - blog on improving frame performance (many videos etc)

**http://csstriggers.com** - cheatsheet of css properties what kind of events they trigger (layout/paint/composite)

**Homework**:
- https://github.com/udacity/news-aggregator : this initial project performs really badly. Our goal is to fix it!
- https://github.com/udacity/pizza-perf - task from "Stop FSL" part - get rid of FSL

### UDACITY Website Performance Optimization Course

- Materials & links : https://www.udacity.com/wiki/ud884
- Homework: https://github.com/cameronwp/udportfolio & https://www.udacity.com/course/viewer#!/c-ud884/l-1469569174/m-1566968609 - page to optimize
- Homework 2: https://github.com/udacity/frontend-nanodegree-mobile-portfolio !!
- Sample page to optimize: https://github.com/udacity/frontend-nanodegree-mobile-portfolio
- Forum: https://discussions.udacity.com/c/standalone-courses/website-performance-optimization

#### Critical Rendering Path (CRP)

```
DOM --------------------> CSSOM -> Render Tree -> Layout -> Paint
 |                           |
 <-----> JavaScript  <------->
```

DOM and CSSOM is combined into Render Tree. Render Tree has only visible content.

Layout step is responsible for setting width/height and position of the elements. Basically Box Model boxes are constructed. It emits Layout events in Timeline - this is another area for improvement (e.g. Layout of one element can affect other). Layout is sometimes called Reflow.

##### CSS is render blocking! And CSS is blocking JavaScript execution (!!!!)

Partial CSSOM tree cannot be used to render the page. Browser blocks page rendering untill it receives and processes all CSS!

When browser is fetching CSS & JS resources, next step it to parse CSS and construct CSSOM tree. Once this is done, then JS can be executed (not before!!). **Completing CSSOM will unblock JavaScript engine**.

##### Timeline events

- Recalculate Style(s) : converting CSS text response into CSSOM. This is potential place for optimization: check time spend on this event before & after CSS optimization. But in another course, author claims that Recalculate Styles result is Render Tree.

### Tips/Hints/Tricks:

- **Incremental HTML delivery**:  browser constructs DOM incrementally, so this is first tip to speed up rendering of the page. Browser does not have to wait for all HTML to arrive to start processing and building DOM.
- HTML optimization: minify + compress + cache
- **Render Blocking CSS**: when would the browser render the page? As sson as the browser has the CSS and builds CSSOM. To optimize CSS, you can split it into more files, each with different media query on ```<link>``` tag. And of course, minimize + compress + cache.
- **Parser Blocking Scripts**: JavaScript is Parser Blocking. JavaScript can modify DOM & CSSOM. When browser encounters ```<script>``` tag, it pauses DOM construction. As browser waits for JavaScript & executes it, it slows down CRP. So what can be done: eg. some scripts as analytics should not block rendering if they don't modify CSSOM / DOM . Options are:
 - execute/load scripts on load event (https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers.onload event)
 - async attribute on script tag (!) - it tells browser not to block DOM construction and execution of the script does not get blocked if CSSOM is not ready. So if script is available before CSSOM is ready, it still can be executed. **async does not block CRP!**

> JavaScript can query and modify DOM and CSSOM.

> JavaScript execution blocks on CSSOM.

> JavaScript blocks DOM construction unless explicitly declared as async.

- Preload Scanner: bloody browser's feature that scans DOM (without parsing) and seeks for resources (js/css) and preloads it, so that when parser gets to the link/script tag, the resource is already there.

### Questions
- why Paint events happend before last css finishes downloading (for page)
- http://chimera.labs.oreilly.com/books/1230000000545 - book High Performance Browser Networking
- https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript#parser-blocking-vs-asynchronous-javascript **TODO**
- https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp#performance-patterns - **TODO**
- https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path - **TODO**
- https://developers.google.com/speed/docs/insights/mobile - how to deliver a page that can be rendered in one second or less **TODO**

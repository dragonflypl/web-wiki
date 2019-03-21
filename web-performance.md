# Performance

> ## You cannot optimize what you cannot measure

Why performance is important ? <https://wpostats.com/> : Case studies and experiments demonstrating the impact of web performance optimization (WPO) on user experience and business metrics.

## Course

- https://learning.oreilly.com/videos/tl-dr-web-performance/9781492029915/9781492029915-video316955

## Books

- High Performance Images
- High Performance Web Sites
- Responsive & Fast
- Browser Networking

## HTTP/2

Gives multiplexing, header compression + compression with e.g. Brotli over https.

Don't use server push as it is hard. Instead do resource hints.

## Resource Hints 

Use resource hints like preconnect / preload / prefetch / async / defer .

More info : <https://www.keycdn.com/blog/resource-hints>

## Responsive images

- <https://www.youtube.com/watch?v=dJDoPFbcJR4> - srcset, sizes, picture explained along with breakpoint practices
- `srcset` and `sizes` explained: <https://builtvisible.com/responsive-images-for-busy-people-a-quick-primer/>
- <https://www.responsivebreakpoints.com/> - tool for computing responsive images sets / breakpoints

## HTTP Caching

- every browser ships with HTTP cache
- provide correct HTTP headers

### ETag

- validation token
- the server uses the ETag HTTP header to communicate a validation token
- The validation token enables efficient resource update checks: no data is transferred if the resource has not changed. 
- used after cache has expired

![image](https://cloud.githubusercontent.com/assets/5444220/24800161/4729c1e8-1b9f-11e7-948c-a237a7dbd726.png)

### Cache-control

- Each resource can define its caching policy via the Cache-Control HTTP header.
- Cache-Control directives control who can cache the response, under which conditions, and for how long.

> Don't use Pragma

### Invalidation

Cache is used until it expires. How to force invalidation? No way...

Solution: embedding a file content fingerprint in the URL enables you to force the client to update to a new version of the response.

- https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching
- https://devcenter.heroku.com/articles/increasing-application-performance-with-http-cache-headers

## Web Performance Optimization 

You can't optimize what you can't measure.

- navigation Timing API to the rescue: captures browser events timestamps. This link has code snippet that does measurement of critical rendering path: 

https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp?hl=en .

- another sample of User Timing API http://www.html5rocks.com/en/tutorials/webperformance/usertiming:

``` javascript
var myTime = window.performance.now();
```

- mark/measure/getEntriesByType/getEntriesByName API

``` javascript
window.performance.mark("mark_start_resize");
window.performance.mark("mark_end_resize");
window.performance.measure("measure_resize", "mark_start_resize", "mark_end_resize");
var timeToResize = window.performance.getEntriesByName("measure_resize");
console.log("Time to pizzas: " + timeToResize[0].duration + "ms");
```

- auditing Web Apps With Lighthouse

### UDACITY Browser Rendering Optimization Course

- https://www.udacity.com/course/browser-rendering-optimization--ud860 - course itself

#### Making single frame

Typical frame: 

```JavaScript (or CSS Animations or Web Animation API) -> Style -> Layout/Reflow -> Paint -> Composite```. 

Three possible paths are:

1. All steps
2. JavaScript -> Style -> Composite
3. JavaScript -> Style -> Paint -> Composite (no geometry changes thus layout is not needed)

**Layout** - process of constructing render tree (visible part of the DOM) from a DOM tree - the more complex the DOM, the more expensive opetration may be

![image](https://cloud.githubusercontent.com/assets/5444220/24801792/ecaa91dc-1ba5-11e7-854d-dddfd6009aa5.png)

```
var bstyle = document.body.style; // cache

bstyle.padding = "20px"; // reflow, repaint
bstyle.border = "10px solid red"; // another reflow and a repaint
 
bstyle.color = "blue"; // repaint only, no dimensions changed
bstyle.backgroundColor = "#fad"; // repaint
 
bstyle.fontSize = "2em"; // reflow, repaint
 
// new DOM element - reflow, repaint
document.body.appendChild(document.createTextNode('dude!'));
```

**Rasterizer** - step that turns Vector into Raster i.e. turns Layout into pixels. Tools will show this as **Paint** event.

**Composite Layers** - event for a process of handling layers. Finally when layers are done (this whole process is done on CPU) they will be uploaded to GPU and GPU will put them on the display.

> Nowadays, browsers take advantage of the GPU and draw some elements to separate “layers” using the CPU, and use the GPU to composite these layers together to give the final pixels drawn to the screen.

**Layout boundaries**: usually changes in layout affect whole document. But it is possible to optimize it, here's some in-depth info: http://wilsonpage.co.uk/introducing-layout-boundaries/ .

#### Browsers are smart

Browser can queue reflow But JavaScript script can prevent browser from optimizing reflows and cause flusing reflow:

```
offsetTop, offsetLeft, offsetWidth, offsetHeight
scrollTop/Left/Width/Height
clientTop/Left/Width/Height
getComputedStyle(), or currentStyle in IE
```

```
// bad
var left = 10,
    top = 10;
el.style.left = left + "px";
el.style.top  = top  + "px";
 
// better 
el.className += " theclassname";
 
// or when top and left are calculated dynamically...
 
// better
el.style.cssText += "; left: " + left + "px; top: " + top + "px;";
```

```
// no-no!
for(big; loop; here) {
    el.style.left = el.offsetLeft + 10 + "px";
    el.style.top  = el.offsetTop  + 10 + "px";
}
 
// better
var left = el.offsetLeft,
    top  = el.offsetTop
    esty = el.style;
for(big; loop; here) {
    left += 10;
    top  += 10;
    esty.left = left + "px";
    esty.top  = top  + "px";
}
```

#### Application Lifecycle from Rendering perspective

**RAIL** - Response, Animations, Idle, Load:
- L (1sek): should be preety quick, like 1s in total. After load is done, app is ini idle
- I (50ms): idle blocks are usually 50ms long, but there can multiple idle blocks in one go. This is prefect place to do jobs that were defered during Load phase in order to make it quick (so called post-load idle state). It is crucial to keep post-load performed tasks to 50ms, as user actions can happen during post-load idle state (we have 100ms to respond to user actions!).
- Response (100ms): by response we mean that application reacts to users actions (simple change, like toggling a checkbox) within 100ms (study show this is a threshold of good UX)
- Animate (16ms): if user's action requires animation we need 60fps

More on RAIL:
- https://developer.chrome.com/devsummit/speakers - plenty of videos from dev summit

#### Optimizing Javascript

- Migrate to WebWorkers
- Use requestAnimationFrame
- Avoid **Forced Synchronus Layout / Additional reflows** - it occurs when you ask the browser to run Layout first inside JavaScript section and then recalculate styles & run Layout again (what triggers layout http://gent.ilcore.com/2011/03/how-not-to-trigger-layout-in-webkit.html)
- Prevent Layout Trashing:
 - Layout Thrashing occurs when JavaScript violently writes, then reads, from the DOM, multiple times causing document reflows 
 - detect it with DevTools red markers
 - https://blog.idrsolutions.com/2014/08/beware-javascript-layout-thrashing/
 - http://blog.fogcreek.com/we-spent-a-week-making-trello-boards-load-extremely-fast-heres-how-we-did-it/
 - http://wilsonpage.co.uk/preventing-layout-thrashing/
- minimize repain & reflow: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/

> A repaint occurs when changes are made to an elements skin that changes visibility, but do not affect its layout (e.g. background color).

#### Optimization in general

- disable heavy styles (borders, shadows, and gradients can really slow down a browser)

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
- Update Layer Tree - browser's internal engine (on Chrome this is called Blink) figures out what layers a needed for the page. It looks at the styles of the elements and decides the order of layers and how many layers are needed
- Composite Layer - browser is putting the page together to send to the screen

The more layers on the page, the more time will be spend on layer management & compositing. There's a trafeoff between reducing paint time and increasing layer management time.

Layers are automated process by the browser and normally nothing has to be done. However, if app is struggling with Paint issue, it's time to consider promoting element to its own layer.

To promote element to its own composited layer use two hacks:

- will-change: transform (or any other visual property)
- transform: translateZ(0)

Promoting elements to layers can be beneficial for avoiding paint problems, especially those related to movement or opacity changes. But changing visual property like text color or shadows, this trick won't help. Update layer tree should not be more than 2ms & 2ms for compositing.

#### Layers in depth

- Stick to compositor-only properties and manage layer count
 - hints: https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count?hl=en

I had some problems with understanding the concept. This one helped me (awesome article): https://engineering.gosquared.com/optimising-60fps-everywhere-in-javascript - and in particular this quote 

> In this example, the transform forces the browser to place each of the div elements into its own layer on the GPU before compositing them together for displaying on the screen. Now for each frame, the only work is in calculating the new position for each layer, which takes barely any computation power at all. There is no work done in recalculating the box shadows or background gradients – the pixels do not change within their layers, so there are no “Paint” events in the timeline, only “Composite Layers”.

> It’s worth noting also that if you’re aiming for smooth animations on mobile devices, you should aim wherever possible to only animate properties like transform and opacity that can be animated entirely using GPU acceleration. Mobile devices’ processors are, as a rule, pretty terrible in comparison to their GPUs. As a result it’s best to avoid animating width or height or other such properties. With a little extra effort it’s usually possible to (for example) animate an element’s transform inside another element with overflow: hidden to achieve the same effect as changing its dimensions.

> For smooth animation, it’s important to ensure that any re-paints are as efficient as possible. This means avoiding animating any properties that are expensive for the browser to draw, such as box shadows or gradients. It’s also important to avoid animating elements which have these properties, or any that will cause a re-paint of regions heavy with these effects.

On layers:
- http://blog.atom.io/2014/07/02/moving-atom-to-react.html
- http://www.html5rocks.com/en/tutorials/speed/layers/
- http://ariya.blogspot.com/2011/07/fluid-animation-with-accelerated.html - fluid animation with accelerated composition

#### Optimizing Animations
- minimize number of Layout/Paint events
- http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/ - High Performance Animations
- https://aerotwist.com/blog/flip-your-animations/ - FLIP (First Last Invert Play) - approach to playing animations

#### Resources

**BEM** : Block Element Modifier. Approach to create clean/effective/portable components (with fast css selectors that are advantageous to performance):
- http://www.sitepoint.com/bem-smacss-advice-from-developers
- https://en.bem.info/method/key-concepts
- http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/
- http://mathayward.com/modular-css-with-sass-and-bem/

**http://jankfree.org/** - blog on improving frame performance (many videos etc)

**http://csstriggers.com** - cheatsheet of css properties what kind of events they trigger (layout/paint/composite)

**http://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome** - in depth description of GPU Accelerated Compositing in Chrome

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

https://developers.google.com/web/fundamentals/performance/critical-rendering-path/

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

### Resources

- Akamai workshop slides: <https://www.slideshare.net/GarethHughes3/tldr-web-performance-workshop>
- http://blog.gigaspaces.com/amazon-found-every-100ms-of-latency-cost-them-1-in-sales/
- https://developers.google.com/web/showcase/
 - https://developers.google.com/web/showcase/2016/aliexpress
- https://developers.google.com/web/fundamentals/performance/rendering - complete section on rendering performance
- amazing demo of how to fix scrolling issues with background-image fixed pages:
 - https://www.youtube.com/watch?v=QU1JAW5LRKU
 - http://fourkitchens.com/blog/article/fix-scrolling-performance-css-will-change-property
- - debouncint scroll & mouse events for better animations: http://www.html5rocks.com/en/tutorials/speed/animations/
- https://aerotwist.com
 - https://aerotwist.com/blog/pixels-are-expensive/ 
- http://www.html5rocks.com/en/tutorials/speed/scrolling/ (read)
- https://aerotwist.com/blog/on-translate3d-and-layer-creation-hacks/ (read)
- https://www.youtube.com/watch?v=mSK70FwUz2A - amazing junk optimization (paint & recalculate styles)
- https://www.youtube.com/watch?v=NZelrwd_iRs - amazing video (shows benefits of using layers - with a help of translate vs positioning with TLRB). It also shows usage of **Composited render layer borders** flag - it shows every layer that is composited on GPU and draw boxes around it. Basically : Painting is happening on CPU (see paint rectangles), and Paiting is expensive.
- http://www.html5rocks.com/en/mobile/optimization-and-performance/ (read)
- http://www.stubbornella.org/content/2009/03/27/reflows-repaints-css-performance-making-your-javascript-slow (read)
- http://ariya.ofilabs.com/2013/06/optimizing-css3-for-gpu-compositing.html - article on layers and sample html with demo on how CSS affects performance if painting is needed
- https://www.youtube.com/watch?v=gTHAn-nkQnI - Fluid User Interface with Hardware Acceleration (with cool sample pages that show power of GPU usage)
- http://www.smashingmagazine.com/2012/11/writing-fast-memory-efficient-javascript/ - TODO!
- https://medium.com/@luisvieira_gmr/html5-prefetch-1e54f6dda15d#.l6hf7tmn2 - HTML prefetch TODO!

#### Online Tools 

- http://checkgzipcompression.com/
- http://loadtestertool.com/
- http://richpreview.com/
- http://www.imageoptimizer.net/
- http://dataurl.net/

#### DevTools

- DevTools docs: https://developers.google.com/web/tools/chrome-devtools/ 
- Two Paint events, what's the difference:
 - http://stackoverflow.com/questions/27392133/in-the-dev-tools-timeline-what-are-the-empty-green-rectangles/27426601
 - https://developers.google.com/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#clear-or-light-gray-frames

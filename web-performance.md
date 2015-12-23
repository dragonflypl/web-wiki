# Performance
## HTTP Caching

- https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching
- https://devcenter.heroku.com/articles/increasing-application-performance-with-http-cache-headers

## Web Performance Optimization 
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

#### Resources

**http://csstriggers.com** - cheatsheet of css properties what kind of events they trigger (layout/paint/composite)

**Homework** - https://github.com/udacity/news-aggregator : this initial project performs really badly. Our goal is to fix it!

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

# Performance
## HTTP Caching

- https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching
- https://devcenter.heroku.com/articles/increasing-application-performance-with-http-cache-headers

## Web Performance Optimization 
### UDACITY Website Performance Optimization Course

- Materials & links : https://www.udacity.com/wiki/ud884
- Sample page to optimize: https://github.com/udacity/frontend-nanodegree-mobile-portfolio
- Forum: https://discussions.udacity.com/c/standalone-courses/website-performance-optimization

#### Critical Rendering Path (CRP)

```
DOM --------------------> CSSOM -> Render Tree -> Layout -> Paint
 |                           |
 <-----> JavaScript  <------->
```

DOM and CSSOM is combined into Render Tree. Render Tree has only visible content.

Layout step is responsible for setting width/height and position of the elements. Basically Box Model boxes are constructed. It emits Layout events in Timeline - this is another area for improvement.

##### CSS is render blocking! And CSS is blocking JavaScript execution (!!!!)

Partial CSSOM tree cannot be used to render the page. Browser blocks page rendering untill it receives and processes all CSS!

When browser is fetching CSS & JS resources, next step it to parse CSS and construct CSSOM tree. Once this is done, then JS can be executed (not before!!). **Completing CSSOM will unblock JavaScript engine**.

##### Timeline events

- Recalculate Style : converting CSS text response into CSSOM. This is potential place for optimization: check time spend on this event before & after CSS optimization.

### Tips/Hints/Tricks:

- **Incremental HTML delivery**:  browser constructs DOM incrementally, so this is first tip to speed up rendering of the page. Browser does not have to wait for all HTML to arrive to start processing and building DOM.
- HTML optimization: minify + compress + cache
- **Render Blocking CSS**: when would the browser render the page? As sson as the browser has the CSS and builds CSSOM. To optimize CSS, you can split it into more files, each with different media query on ```<link>``` tag. And of course, minimize + compress + cache.
- **Parser Blocking Scripts**: JavaScript is Parser Blocking. JavaScript can modify DOM & CSSOM. When browser encounters ```<script>``` tag, it pauses DOM construction. As browser waits for JavaScript & executes it, it slows down CRP. So what can be done: eg. some scripts as analytics should not block rendering if they don't modify CSSOM / DOM . Options are:
 - execute/load scripts on load event (https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers.onload event)
 - async attribute on script tag (!) - it tells browser not to block DOM construction and execution of the script does not get blocked if CSSOM is not ready. So if script is available before CSSOM is ready, it still can be executed. **async does not block CRP!**

### Questions
- why Paint events happend before last css finishes downloading (for page)

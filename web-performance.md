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

Layout step is responsible for setting width/height and position of the elements. Basically Box Model boxes are constructed.

##### CSS is render blocking!

Partial CSSOM tree cannot be used to render the page. Browser blocks page rendering untill it receives and processes all CSS!

##### Timeline events

- Recalculate Style : converting CSS text response into CSSOM. This is potential place for optimization: check time spend on this event before & after CSS optimization.

### Tips/Hints/Tricks:

- **Incremental HTML delivery**:  browser constructs DOM incrementally, so this is first tip to speed up rendering of the page. Browser does not have to wait for all HTML to arrive to start processing and building DOM.

### Questions
- why Paint events happend before last css finishes downloading (for page)

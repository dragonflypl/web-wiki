# Performance

## Angular's differs

> https://www.youtube.com/watch?v=ukErcJDjR_Y & https://github.com/dragonflypl/purely-fast & http://blog.mgechev.com/2017/11/14/angular-iterablediffer-keyvaluediffer-custom-differ-track-by-fn-performance/

Angular has a concept of differs: this is strategy used to compare iterables e.g. in ngFor directive. Although flexible, is has 0(n) complexity. 
It it possible to create custom differ that is designed specificaly for one time of collections (like immutable.js's collections).
This can give 0(1) complexity for detecting changes. This article explains details and code is provided. It contains application of different techniques:
- `OnPush`
- components separation
- using pure pipes for calculations
- memoization with lodash for caching results
- using persistent data structers and custom differs

# Tools

- <https://github.com/angular/angular/tree/master/packages/benchpress> - tool for e2e performance testing

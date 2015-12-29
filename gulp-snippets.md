- gulp-size - plugin that displays size of files in the stream. Useful for displaying total size of resources per type
``` javascript
gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}));
});
```

- gulp-uncss - (magic!) - plugin that removes unused css selectors from stylesheets

- browserSync

``` javascript
var reload = browserSync.reload;
gulp.task('serve', ['styles'], function() {
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    server: ['app']
  });
  // reload on file changes
  gulp.watch(['app/**/**/**/*.html'], reload);
});
```

- del - delete folders/files

``` javascript
var del = require('del');
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], {dot: true}));
```

- jshint

```javascript
gulp.task('jshint', function() {


  return gulp.src(['app/scripts/**/*.js', 'app/styleguide/**/*.js'])
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});
```

- gulp-if - execute stream on condition (and more)

``` javascript
.pipe(gulpif('*.css', $.csso()))
```

- lazypipe - Lazypipe allows you to create an immutable, lazily-initialized pipeline. It's designed to be used in an environment where you want to reuse partial pipelines

``` javascript
var gulpif = require('gulp-if');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

var linting = false;
var compressing = false;

var jshintChannel = lazypipe()
  // adding a pipeline step
  .pipe(jshint) // notice the stream function has not been called!
  .pipe(jshint.reporter)
  // adding a step with an argument
  .pipe(jshint.reporter, 'fail');

gulp.task('scripts', function () {
  return gulp.src(paths.scripts.src)
    .pipe(gulpif(linting, jshintChannel()))
    .pipe(gulpif(compressing, uglify()))
    .pipe(gulp.dest(paths.scripts.dest));
});
```

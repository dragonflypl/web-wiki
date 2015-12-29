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

// install selenium
gulp.task('install-selenium', require('./tools/install'));
// browser tests
gulp.task('test', ['install-selenium'], require('./tools/test'));
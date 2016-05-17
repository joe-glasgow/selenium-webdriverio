var gulp = require('gulp');
// install selenium
gulp.task('install-selenium', require('./tools/install-selenium'));

gulp.task('browser-test', ['install-selenium'], require('./tools/browser-test'));
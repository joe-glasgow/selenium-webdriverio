var gulp = require('gulp');
var webdriver = require('gulp-webdriver');
var args = require('yargs').argv;
// Arguments
var site = args.site;
// Common
var config = process.cwd() + '/wdio.conf.js';
console.log(site);
// Site specific
if (site) {
    config = process.cwd() + '/tests/' + site + '/wdio.conf.' + site + '.js';
    console.log(config)
}

var FirefoxProfile = require('firefox-profile');
var myProfile = new FirefoxProfile();
// check geolocation boxes
myProfile.setPreference("geo.prompt.testing", true);
myProfile.setPreference("geo.prompt.testing.allow", true);

// Invoke Webdriver
module.exports =  function() {
      return gulp.src(config)
        .pipe(
            webdriver({
                updateJob: true,
                logLevel: 'verbose',
                logOutput: 'testResults.txt',
                port: 4444,
                host: '127.94.0.1',
                path: '/wd/hub',
                capabilities: {
                    browserB: {
                        desiredCapabilities: {
                            browserName: 'firefox',
                            locationContextEnabled: true,
                            firefox_profile: myProfile
                        }
                    }
                }
            })
        );
};

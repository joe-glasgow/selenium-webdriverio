var selenium = require('selenium-standalone');

module.exports = function (done) {
    selenium.install({
        // check for more recent versions of selenium here:
        // http://selenium-release.storage.googleapis.com/index.html
        version: '2.53.0',
        baseURL: 'http://selenium-release.storage.googleapis.com',
        drivers: {
          chrome: {
            // check for more recent versions of chrome driver here:
            // http://chromedriver.storage.googleapis.com/index.html
            version: '2.21',
            arch: process.arch,
            baseURL: 'http://chromedriver.storage.googleapis.com'
        }
        //   ie: {
        //     // check for more recent versions of internet explorer driver here:
        //     // http://selenium-release.storage.googleapis.com/index.html
        //     version: '2.45',
        //     arch: process.arch,
        //     baseURL: 'http://selenium-release.storage.googleapis.com'
        // }
        },
        logger: function(message) {
            console.log(message);
        }
    }, function (err) {
        // return if there's an error in selenium
        if (err) return done(err);
        // start seleinium
        selenium.start({spawnOptions: {
          stdio: 'ignore'
        }}, function (err, child) {
            // return if there's an error start selenium
           if (err) return done(err);
           selenium.child = child;
           done();
         });
    });
};

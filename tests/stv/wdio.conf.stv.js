var exec = require('child_process').exec;

exports.config = {
    updateJob: false, // will get overwritten
    specs : ['./*-spec.js'],
    capabilities: {
        browserA: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        },
        browserB: {
            desiredCapabilities: {
                browserName: 'firefox'
            }
        }/*,
        browserC: {
            desiredCapabilities: {
                browserName: 'safari'
            }
        }*/
    },
    onPrepare: function(data) {
        // do something
    },
    before: function() {
       // do something
       GLOBAL.stvEnvironment = process.env.BASE_URL;
    },
    after: function() {
       // do something
        exec('pkill java');
    },
    onComplete : function () {
        exec('pkill java');
    },
    afterSuite: function () {
        exec('pkill java');
    }
}
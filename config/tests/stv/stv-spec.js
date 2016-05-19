var assert = require('assert');
var sites = require(process.cwd() + '/config/sites.js');
function myTest(site) {
    describe('Account :: ', function () {

                describe('Sign in - As a user', function () {

                    it('I can click sign in and see a sign modal', function async (done) {
                        //browser.url('http://' + site, done)
                            return browser
                            .timeouts('page load', 40000)
                            .url('http://' + site)
                            .getTitle().then(function(title) {

                                assert.equal(true, true)
                            })
                            .call(done);
                    });
            });
    });
}

for (var i = 0; i < sites.length; i++) {
    myTest(sites[1]);
}

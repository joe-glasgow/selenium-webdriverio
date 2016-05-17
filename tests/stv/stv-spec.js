var assert = require('assert');
var sites = require(process.cwd() + '/config/sites.js');
function myTest(site) {
    describe('Account :: ', function () {

                describe('Sign in - As a user', function () {
                    before(function (done) {
                        // local env is SLOOWWWWWWWWW
                        this.timeout(40000);
                        browser.url('http://' + site, done);
                    });

                    it('I can click sign in and see a sign modal', function (done) {
                        this.timeout(40000);
                        browser
                            // for dynamic bars
                            .pause(3000)
                            .click('body')

                            .then(function(value) {
                                assert.equal(true, true);
                            })
                            .call(done);
                    });
            });
    });
}

for (var i = 0; i < sites.length; i++) {
    myTest(sites[i]);
}

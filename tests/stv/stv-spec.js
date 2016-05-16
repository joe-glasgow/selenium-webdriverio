var assert = require('assert');
var sites = require(process.cwd() + 'config/sites.js');
var site = GLOBAL.stvEnvironment || 'stv.tv';
function SignInTest(site) {
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
                            .click('[data-modal-id="registration-sign-in"]')
                            .pause(1000)//delay to wait for the fade in for the modal.
                            .isVisible('#registration-sign-in')
                            .then(function(value) {
                                assert.equal(value, true);
                            })
                            .call(done);
                    });

                    it('I can see the email address field', function (done){
                        browser
                            .isVisible('#sign-in-id')
                            .then(function(value){
                                assert.equal(value, true);
                            })
                            .call(done);
                    });

                    it('I can see the password field', function (done){
                        browser
                            .isVisible('#sign-in-password')
                            .then(function(value){
                                assert.equal(value, true);
                            })
                            .call(done);
                    });

                    it('I can see the submit button', function (done){
                        browser
                            .isVisible('#registration-sign-in .gigya-input-submit')
                            .then(function(value){
                                assert.equal(value, true);
                            })
                            .call(done);
                    });

                    it('I can see the cancel/x buttons', function (done){
                        browser
                            .isVisible('#registration-sign-in [data-close-registration]')
                            .then(function(value){
                                // There is a cancel text and cross in modal
                                var closeEls = value.length;
                                // Expect 2 close buttons
                                assert.equal(closeEls, 2);
                            })
                            .call(done);
                    });

                    it('I can see the sign in modal disappear when I click cancel/x buttons', function(done) {
                        browser
                            .click('#registration-sign-in [data-close-registration]')
                            .pause(1000)
                            .isVisible('#registration-sign-in [data-modal-id="registration-sign-in"]')
                            .then(function(value) {
                                assert.equal(value, false);
                            })
                            .call(done);
                    });

                    it('I cannot submit the form when fields are empty', function (done){
                        browser
                            .click('[data-modal-id="registration-sign-in"]')
                            .pause(1000)//delay to wait for the fade in for the modal.
                            .setValue('#registration-sign-in #sign-in-id', '')
                            .setValue('#registration-sign-in #sign-in-password', '')
                            .click('#registration-sign-in .gigya-input-submit')
                            .pause(1000)//delay to wait for the fade in for the modal.
                            .submitForm('#registration-sign-in #registration-sign-in-form', function (done) {
                                browser.isVisible('#registration-sign-in').then(function(value) {
                                    assert.equal(value, true);
                                });
                            })
                            .call(done);
                    });

                    it('I can see error feedback when entering incorrect credentials', function(done) {
                        browser
                        .setValue('#registration-sign-in #sign-in-id', 'manofsteel')
                        .setValue('#registration-sign-in #sign-in-password', 'batman')
                        .submitForm('#registration-sign-in-form')
                        .pause(1000)
                        .isVisible('.registration-modal__field__error')
                        .then(function(value) {
                            // Value is array of error fields, at least one must be true
                            var hasError = (value.indexOf(true) > -1 ) ? true : false;
                            assert.equal(hasError, true);
                        }).
                        call(done);
                    });

                    it('I can sign in with correct credentials', function(done) {
                        browser
                            .setValue('#registration-sign-in #sign-in-id', '')
                            .setValue('#registration-sign-in #sign-in-password', '')
                            .setValue('#registration-sign-in #sign-in-id', 'test123@test.com')
                            .setValue('#registration-sign-in #sign-in-password', 'test123')
                            .submitForm('#registration-sign-in-form')
                            .pause(1000)
                            .getText('#registration-user-greeting')
                            .then(function(value) {
                                assert.equal(value, 'Hi test');
                            })
                            .call(done);
                    });

                    it('I can sign out', function(done) {
                        browser
                        .click('#registration-sign-out-nav')
                        .pause(1000)//delay to wait for the fade in for the modal.
                        .getText('.account-panel a[data-modal-id="registration-sign-in"]')
                        .then(function(value) {
                            assert.equal(value, 'Sign in');
                        })
                        .call(done);
                    });
            });
    });
}

for (var i = 0; i < sites.length; i++) {
    SignInTest(sites[i]);
}

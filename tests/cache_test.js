var assert = require('assert');
var localStorage = require('localStorage');
var Cache = require('../lib/cache.js');
var cache;

describe('The module', function() {

    beforeEach(function() {
        localStorage.clear();
        cache = new Cache({ localStorage: localStorage });
    });

    describe('get()', function() {
        describe('When a value is set using set()', function(){
            beforeEach(function(){
                cache.set('kyle', 'rox');
            });

            it('Gets the value', function() {
                assert(cache.get('kyle') == 'rox');
            });
        })
    });

    describe('set()', function(){
        describe('When expiration is set', function(){
            var itPasses = function(){
                it('expires in that number * milliseconds', function(done){
                    assert(cache.get('kyle') == 'rox', 'The value should not be null yet');

                    setTimeout(function(){
                        assert(cache.get('kyle') == null, 'The value should have expired and be null');
                        done();
                    }, 51);
                })
            }

            describe('When expiration is a number', function(){
                beforeEach(function(){
                    cache.set('kyle', 'rox', 50);
                });
                itPasses();
            });

            describe('When expiration is an option, "expiresIn"', function(){
                beforeEach(function(){
                    cache.set('kyle', 'rox', { expiresIn: 50 });
                });
                itPasses();
            });

            describe('When expiration is an option, "expiresIn", with milliSeconds set', function(){
                beforeEach(function(){
                    cache.set('kyle', 'rox', { expiresIn: { milliSeconds: 50 } });
                });
                itPasses();
            });

            describe('When expiration is an option, "expiresIn", with seconds set', function(){
                beforeEach(function(){
                    cache.set('kyle', 'rox', { expiresIn: { seconds: 50 / 1000 } });
                });
                itPasses();
            });

            describe('When expiration is an option, "expiresIn", with minutes set', function(){
                beforeEach(function(){
                    cache.set('kyle', 'rox', { expiresIn: { minutes: (50 / 1000) / 60 } });
                });
                itPasses();
            });

            describe('When expiration is an option, "expiresIn", with hours set', function(){
                beforeEach(function(){
                    cache.set('kyle', 'rox', { expiresIn: { hours: ((50 / 1000) / 60) / 60 } });
                });
                itPasses();
            });

            describe('When expiration is an option, "expiresIn", with days set', function(){
                beforeEach(function(){
                    cache.set('kyle', 'rox', { expiresIn: { days: (((50 / 1000) / 60) / 60) / 24 } });
                });
                itPasses();
            });

        })

    });

});

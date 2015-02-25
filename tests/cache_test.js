var sinon = require('sinon');
var assert = require('assert');
var localStorage = require('localStorage');
var Cache = require('../lib/cache.js');
var cache;

describe('The module', function() {

    beforeEach(function() {
        localStorage.clear();
        cache = new Cache({ localStorage: localStorage });
    });

    describe('get', function() {
        beforeEach(function(){
            cache.set('kyle', 'rox');
        });

        it('Gets the value', function() {
            assert(cache.get('kyle') == 'rox');
        });

    });

    describe('set', function(){
        describe('When expiration is a number', function(){
            beforeEach(function(){
                cache.set('kyle', 'rox', 1000);
            })

            it('expires in that number * milliseconds', function(done){
                assert(cache.get('kyle') == 'rox');
                setTimeout(function(){
                    assert(cache.get('kyle') == null);
                    done();
                }, 1001);
            })
        });
    })
});

var Cache = function(opts){
    var options = typeof opts == 'object' ? opts : {};
    options.namespace = options.namespace || 'kyleRox--cache';
    this.options = options;

    if(typeof window == 'object' && typeof window.localStorage == 'object'){
        this.storage = window.localStorage;
    } else if(options.localStorage){
        this.storage = options.localStorage;
    }

    this.enabled = this.storage ? true : false;

    if(!options.isExpirationCache){
        this.expirationCache = new Cache({
            namespace: this.options.namespace + '___EXPIRES_IN___',
            isExpirationCache: true,
            localStorage: this.storage
        });
    }
}

Cache.prototype.get = function(key, callback){
    if(!this.enabled){
        return;
    }

    var data = load.call(this);

    if(isExpired.call(this, key)){
        delete data[key];
        store.call(this, data);
        return null;
    }

    return data[key];
}

Cache.prototype.set = function(key, value, options){
    if(!this.enabled){
        return;
    }

    var data = load.call(this);
    data[key] = value;
    store.call(this, data);

    if(options){
        setExpiration.call(this, key, options);
    }
}

Cache.prototype.fetch = function(key, options){
    validateKey(key);
    validateOption(options, 'get', 'fetch');
    validateOption(options, 'done', 'fetch');

    var self = this;
    var value = self.get(key);

    if(value){
        options.done(value);
        return;
    }

    options.done.__freshFetch = true;
    options.get(function(value){
        if(options.done.__freshFetch){
            delete options.done.__freshFetch;
            self.set(key, value, options);
        }

        done(value);
    });
}

function load(){
    var stringifiedData = this.storage[this.options.namespace];
    if(stringifiedData === undefined){
        return {};
    }
    return JSON.parse(stringifiedData);
}

function store(data){
    var stringifiedData = JSON.stringify(data);
    this.storage[this.options.namespace] = stringifiedData;
}

function validateKey(key){
    if(!key){
        throw 'key is required!';
    }
}

function validateOption(options, key, functionName){
    if(!options[key] || typeof options[key] !== 'function'){
        throw 'Cache.' + functionName + '() requires you pass in a "' + key + '" callback option';
    }
}

function setExpiration(key, options){
    var expirationMilli = getExpirationMilliSeconds(options);
    var date = new Date();
    date.setMilliseconds(date.getMilliseconds() + expirationMilli);
    this.expirationCache.set(key, date.toString());
}

function isExpired(key){
    if(!this.expirationCache){
        return;
    }

    var value = this.expirationCache.get(key);
    if(value){
        var expired = new Date() > new Date(value);

        if(expired){
            this.expirationCache.set(key, null);
        }

        return expired;
    } else {
        return false;
    }
}

function getExpirationMilliSeconds(options){
    var expirationMilli;

    if(typeof options == 'object'){
        if(options.expiresIn){
            if(typeof options.expiresIn == 'object'){
                if(options.expiresIn.milliSeconds){
                    expirationMilli = options.expiresIn.milliSeconds
                } else if(options.expiresIn.seconds){
                    expirationMilli = options.expiresIn.seconds * 1000;
                } else if(options.expiresIn.minutes){
                    expirationMilli = options.expiresIn.minutes * 1000 * 60;
                } else if(options.expiresIn.hours){
                    expirationMilli = options.expiresIn.hours * 1000 * 60 * 60;
                } else if(options.expiresIn.days){
                    expirationMilli = options.expiresIn.days * 1000 * 60 * 60 * 24;
                }
            } else {
                expirationMilli = number(options.expiresIn);
            }
        }
    } else {
        expirationMilli = number(options);
    }

    return expirationMilli;
}

function number(num){
    if(typeof num == 'number'){
        return num;
    } else if(typeof num == 'string') {
        var number = parseInt(num);
        if(number != NaN){
            return num;
        }
    }
}

module.exports = Cache;

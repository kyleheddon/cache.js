var Cache = function(options){
    options.namespace = options.namespace || 'kyleRox--cache';
    this.options = options;
    this.enabled = window.localStorage ? true : false;
}

Cache.prototype.get = function(key, callback){
    if(!this.enabled){
        return;
    }

    var data = load.call(this);
    return data[key];
}

Cache.prototype.set = function(key, value, options){
    if(!this.enabled){
        return;
    }

    var data = load.call(this);
    data[key] = value;
    store.call(this, data);
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
    var stringifiedData = window.localStorage[this.options.namespace];
    if(stringifiedData === undefined){
        return {};
    }
    return JSON.parse(stringifiedData);
}

function store(data){
    var stringifiedData = JSON.stringify(data);
    window.localStorage[this.options.namespace] = stringifiedData;
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

module.exports = Cache;

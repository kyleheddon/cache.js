
### cache.js

Localstorage cache

Usage
===
```
var Cache = require('cache.js');
var cache = new Cache({ namespace: 'mynamespace' });

cache.get(function(value){
  doSomeStuff(value);
});
```

fetch(key, options);
---
```
cache.fetch('mykey', {
  get: function(done){
    makeAjaxCall(function(data){
      done(data);
    });
  },
  done: function(data){
    doSomeAsyncStuff(data);
  }
});
```

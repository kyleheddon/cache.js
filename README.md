
### cache.js

Localstorage cache

Usage
===
```
var Cache = require('cache.js');
var cache = new Cache({ namespace: 'mynamespace' });

cache.get('mykey', function(value){
  doSomeStuff(value);
});
```

fetch(key, options);
---
```
cache.fetch('mykey', {
  expiresIn: 1000 * 60 * 2, // 2 minutes  
  get: function(done){
    makeAjaxCall(function(data){
      done(data);
    });
  },
  done: function(data){
    doSomeStuff(data);
  }
});
```

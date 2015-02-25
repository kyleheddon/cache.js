
### cache.js

Localstorage cache

Usage
===
```
var Cache = require('cache.js');
var cache = new Cache({ namespace: 'mynamespace' });
```

get(key);
---
```
var value = cache.get('mykey');
console.log(value);
```

set(key, value [, options]);
---
No expiration
```
cache.set('kyle', 'rox');
```
With expiration
```
cache.set('kyle', 'rox', 1000); // 1 second
cache.set('kyle', 'rox', { expiresIn: 1000 }); // 1 second
cache.set('kyle', 'rox', { expiresIn: { milliSeconds: 1000 } }); // 1 second
cache.set('kyle', 'rox', { expiresIn: { seconds: 1 } }); // 1 second
cache.set('kyle', 'rox', { expiresIn: { minutes: 1 } }); // 1 minute
cache.set('kyle', 'rox', { expiresIn: { hours: 1 } }); // 1 hour
cache.set('kyle', 'rox', { expiresIn: { days: 1 } }); // 1 day
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

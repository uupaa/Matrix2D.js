=========
Matrix2D.js
=========

![](https://travis-ci.org/uupaa/Matrix2D.js.png)

Matrix 2D

# Document

- [Matrix2D.js wiki](https://github.com/uupaa/Matrix2D.js/wiki/Matrix2D)
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))


# How to use

```js
<script src="lib/Matrix2D.js">
<script>
// for Browser
console.log( Matrix2D.identity() );
</script>
```

```js
// for WebWorkers
importScripts("lib/Matrix2D.js");
console.log( Matrix2D.identity() );
```

```js
// for Node.js
var Matrix2D = require("lib/Matrix2D.js");
console.log( Matrix2D.identity() );
```

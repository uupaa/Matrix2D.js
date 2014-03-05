Matrix2D.js
=========

Matrix 2D

# Document

https://github.com/uupaa/Matrix2D.js/wiki/Matrix2D

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

# for Developers

1. Install development dependency tools

    ```sh
    $ brew install closure-compiler
    $ brew install node
    $ npm install -g plato
    ```

2. Clone Repository and Install

    ```sh
    $ git clone git@github.com:uupaa/Matrix2D.js.git
    $ cd Matrix2D.js
    $ npm install
    ```

3. Build and Minify

    `$ npm run build`

4. Test

    `$ npm run test`

5. Lint

    `$ npm run lint`



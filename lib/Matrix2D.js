(function(global) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- class / interfaces ----------------------------------
function Matrix2D() {
}

//{@dev
Matrix2D["repository"] = "https://github.com/uupaa/Matrix2D.js"; // GitHub repository URL. http://git.io/Help
//}@dev

Matrix2D["toDegrees"] = Matrix2D_toDegrees; // Matrix2D.toDegrees(radians:RadiansNumber):DegreesNumber
Matrix2D["toRadians"] = Matrix2D_toRadians; // Matrix2D.toRadians(degrees:DegreesNumber):RadiansNumber
Matrix2D["identity"]  = Matrix2D_identity;  // Matrix2D.identity():Matrix2DArray
Matrix2D["multiply"]  = Matrix2D_multiply;  // Matrix2D.multiply(a:Matrix2DArray, b:Matrix2DArray):Matrix2DArray
Matrix2D["scale"]     = Matrix2D_scale;     // Matrix2D.scale(m:Matrix2DArray, x:Number, y:Number):Matrix2DArray
Matrix2D["rotate"]    = Matrix2D_rotate;    // Matrix2D.rotate(m:Matrix2DArray, angle:DegreesNumber):Matrix2DArray
Matrix2D["translate"] = Matrix2D_translate; // Matrix2D.translate(m:Matrix2DArray, x:Number, y:Number):Matrix2DArray

// The WebKitCSSMatrix
//
//     + A, C, E +
//     | B, D, F |
//     + 0, 0, 1 +

// The Matrix2D
//     [ M11, M12, M13,
//       M21, M22, M23,
//       M31, M32, M33 ]

Matrix2D["M11"] = Matrix2D["A"] = 0;
Matrix2D["M12"] = Matrix2D["B"] = 1;
Matrix2D["M13"] = 2;
Matrix2D["M21"] = Matrix2D["C"] = 3;
Matrix2D["M22"] = Matrix2D["D"] = 4;
Matrix2D["M23"] = 5;
Matrix2D["M31"] = Matrix2D["E"] = Matrix2D["X"] = 6;
Matrix2D["M32"] = Matrix2D["F"] = Matrix2D["Y"] = 7;
Matrix2D["M33"] = 8;

// --- implements ------------------------------------------
function Matrix2D_toDegrees(radians) { // @arg RadiansNumber - from 0 to Math.PI * 2
                                       // @ret DegreesNumber - from 0 to 360
//{@dev
    $valid($type(radians, "Number"), Matrix2D_toDegrees, "radians");
//}@dev

    return radians * 180 / Math.PI;
}

function Matrix2D_toRadians(degrees) { // @arg DegreesNumber - from 0 to 360
                                       // @ret RadiansNumber - from 0 to Math.PI * 2
//{@dev
    $valid($type(degrees, "Number"), Matrix2D_toRadians, "degrees");
//}@dev

    return degrees * Math.PI / 180;
}

function Matrix2D_identity() { // @ret Matrix2DArray
    return [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ];
}

function Matrix2D_multiply(a,   // @arg Matrix2DArray
                           b) { // @arg Matrix2DArray
                                // @ret Matrix2DArray - multiply result
//{@dev
    $valid($type(a, "Array"), Matrix2D_multiply, "a");
    $valid($type(b, "Array"), Matrix2D_multiply, "b");
//}@dev

  //return [
  //    b1 * a1 + b2 * a4 + b3 * a7,
  //    b1 * a2 + b2 * a5 + b3 * a8,
  //    b1 * a3 + b2 * a6 + b3 * a9,
  //    b4 * a1 + b5 * a4 + b6 * a7,
  //    b4 * a2 + b5 * a5 + b6 * a8,
  //    b4 * a3 + b5 * a6 + b6 * a9,
  //    b7 * a1 + b8 * a4 + b9 * a7,
  //    b7 * a2 + b8 * a5 + b9 * a8,
  //    b7 * a3 + b8 * a6 + b9 * a9
  //];

    return [
        (b[0] * a[0] + b[1] * a[3]),        (b[0] * a[1] + b[1] * a[4]),        0,
        (b[3] * a[0] + b[4] * a[3]),        (b[3] * a[1] + b[4] * a[4]),        0,
        (b[6] * a[0] + b[7] * a[3] + a[6]), (b[6] * a[1] + b[7] * a[4] + a[7]), 1
    ];
}

function Matrix2D_scale(m,   // @arg Matrix2DArray
                        x,   // @arg Number - scale x
                        y) { // @arg Number - scale y
                             // @ret Matrix2DArray
//{@dev
    $valid($type(m, "Array"),  Matrix2D_scale, "m");
    $valid($type(x, "Number"), Matrix2D_scale, "x");
    $valid($type(y, "Number"), Matrix2D_scale, "y");
//}@dev

    return Matrix2D_multiply([ x, 0, 0,
                               0, y, 0,
                               0, 0, 1 ], m);
}

function Matrix2D_rotate(m,       // @arg Matrix2DArray
                         angle) { // @arg DegreesNumber
                                  // @ret Matrix2DArray
//{@dev
    $valid($type(m, "Array"),      Matrix2D_rotate, "m");
    $valid($type(angle, "Number"), Matrix2D_rotate, "angle");
//}@dev

    var rad = Matrix2D_toRadians(angle);
    var s   = Math.sin(rad);
    var c   = Math.cos(rad);

    return Matrix2D_multiply([ c, s, 0,
                              -s, c, 0,
                               0, 0, 1 ], m);
}

function Matrix2D_translate(m,   // @arg Matrix2DArray
                            x,   // @arg Number
                            y) { // @arg Number
                                 // @ret Matrix2DArray
//{@dev
    $valid($type(m, "Array"),  Matrix2D_translate, "m");
    $valid($type(x, "Number"), Matrix2D_translate, "x");
    $valid($type(y, "Number"), Matrix2D_translate, "y");
//}@dev

    return Matrix2D_multiply(m, [ 1, 0, 0,
                                  0, 1, 0,
                                  x, y, 1 ]);
}

// --- validate / assertions -------------------------------
//{@dev
function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
if ("process" in global) {
    module["exports"] = Matrix2D;
}
global["Matrix2D" in global ? "Matrix2D_" : "Matrix2D"] = Matrix2D; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule


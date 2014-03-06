// @name: Matrix2D.js

(function(global) {

// --- variable --------------------------------------------
var _inNode = "process" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function Matrix2D() { // @help: Matrix2D
}
Matrix2D["name"] = "Matrix2D";
Matrix2D["repository"] = "https://github.com/uupaa/Matrix2D.js";

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

// --- implement -------------------------------------------
function Matrix2D_toDegrees(radians) { // @arg RadiansNumber: from 0 to Math.PI * 2
                                       // @ret DegreesNumber: from 0 to 360
                                       // @help: Matrix2D.toDegrees
    return radians * 180 / Math.PI;
}

function Matrix2D_toRadians(degrees) { // @arg DegreesNumber: from 0 to 360
                                       // @ret RadiansNumber: from 0 to Math.PI * 2
                                       // @help: Matrix2D.toRadians
    return degrees * Math.PI / 180;
}

function Matrix2D_identity() { // @ret Matrix2DArray:
                               // @help: Matrix2D.identity
    return [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ];
}

function Matrix2D_multiply(a,   // @arg Matrix2DArray:
                           b) { // @arg Matrix2DArray:
                                // @ret Matrix2DArray: multiplay result
                                // @help: Matrix2D.multiply
//{@assert
    _if(!_type(a, "Array"), "Matrix2D.multiply(a)");
    _if(!_type(b, "Array"), "Matrix2D.multiply(,b)");
//}@assert

  //return [
  //    a1 * b1 + a2 * b4 + a3 * b7,
  //    a1 * b2 + a2 * b5 + a3 * b8,
  //    a1 * b3 + a2 * b6 + a3 * b9,
  //    a4 * b1 + a5 * b4 + a6 * b7,
  //    a4 * b2 + a5 * b5 + a6 * b8,
  //    a4 * b3 + a5 * b6 + a6 * b9,
  //    a7 * b1 + a8 * b4 + a9 * b7,
  //    a7 * b2 + a8 * b5 + a9 * b8,
  //    a7 * b3 + a8 * b6 + a9 * b9
  //];

    return [
        (b[0] * a[0] + b[1] * a[3]),        (b[0] * a[1] + b[1] * a[4]),        0,
        (b[3] * a[0] + b[4] * a[3]),        (b[3] * a[1] + b[4] * a[4]),        0,
        (b[6] * a[0] + b[7] * a[3] + a[6]), (b[6] * a[1] + b[7] * a[4] + a[7]), 1
    ];
}

function Matrix2D_scale(m,   // @arg Matrix2DArray:
                        x,   // @arg Number: scale x
                        y) { // @arg Number: scale y
                             // @ret Matrix2DArray:
                             // @help: Matrix2D.scale
//{@assert
    _if(!_type(m, "Array"),  "Matrix2D.scale(m)");
    _if(!_type(x, "Number"), "Matrix2D.scale(,x)");
    _if(!_type(y, "Number"), "Matrix2D.scale(,,y)");
//}@assert

    return Matrix2D_multiply([ x, 0, 0,
                               0, y, 0,
                               0, 0, 1 ], m);
}

function Matrix2D_rotate(m,       // @arg Matrix2DArray:
                         angle) { // @arg DegreesNumber:
                                  // @ret Matrix2DArray:
                                  // @help: Matrix2D.rotate
//{@assert
    _if(!_type(m, "Array"),      "Matrix2D.rotate(m)");
    _if(!_type(angle, "Number"), "Matrix2D.rotate(,angle)");
//}@assert

    var rad = Matrix2D_toRadians(angle);
    var s   = Math.sin(rad);
    var c   = Math.cos(rad);

    return Matrix2D_multiply([ c, s, 0,
                              -s, c, 0,
                               0, 0, 1 ], m);
}

function Matrix2D_translate(m,   // @arg Matrix2DArray:
                            x,   // @arg Number:
                            y) { // @arg Number:
                                 // @ret Matrix2DArray:
                                 // @help: Matrix2D.translate
//{@assert
    _if(!_type(m, "Array"),  "Matrix2D.translate(m)");
    _if(!_type(x, "Number"), "Matrix2D.translate(,x)");
    _if(!_type(y, "Number"), "Matrix2D.translate(,,y)");
//}@assert

    return Matrix2D_multiply(m, [ 1, 0, 0,
                                  0, 1, 0,
                                  x, y, 1 ]);
}

//{@assert
function _type(value, types, keys) {
    return types.split(/[\|\/]/).some(judge);

    function judge(type) {
        switch (type.toLowerCase()) {
        case "omit":    return value === undefined || value === null;
        case "array":   return Array.isArray(value);
        case "integer": return typeof value === "number" && Math.ceil(value) === value;
        case "object":  return (keys && value && !hasKeys(value, keys)) ? false
                             : (value || 0).constructor === ({}).constructor;
        default:        return Object.prototype.toString.call(value) === "[object " + type + "]";
        }
    }
    function hasKeys(value, keys) {
        var ary = keys ? keys.split(",") : null;

        return Object.keys(value).every(function(key) {
            return ary.indexOf(key) >= 0;
        });
    }
}
function _if(value, msg) {
    if (value) {
        throw new Error(msg);
    }
}
//}@assert

// --- export ----------------------------------------------
//{@node
if (_inNode) {
    module["exports"] = Matrix2D;
}
//}@node
if (global["Matrix2D"]) {
    global["Matrix2D_"] = Matrix2D; // already exsists
} else {
    global["Matrix2D"]  = Matrix2D;
}

})(this.self || global);


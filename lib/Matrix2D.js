// @name: Matrix2D.js

(function(global) {

// --- variable --------------------------------------------
var _inNode = "process" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function Matrix2D() {
}
Matrix2D["name"] = "Matrix2D";
Matrix2D["repository"] = "https://github.com/uupaa/Matrix2D.js";

Matrix2D["identity"]  = Matrix2D_identity;  // Matrix2D.identity():Matrix2DArray
Matrix2D["multiply"]  = Matrix2D_multiply;  // Matrix2D.multiply(a:Matrix2DArray, b:Matrix2DArray):Matrix2DArray
Matrix2D["scale"]     = Matrix2D_scale;     // Matrix2D.scale(m:Matrix2DArray, x:Number, y:Number):Matrix2DArray
Matrix2D["rotate"]    = Matrix2D_rotate;    // Matrix2D.rotate(m:Matrix2DArray, angle:RadianNumber):Matrix2DArray
Matrix2D["translate"] = Matrix2D_translate; // Matrix2D.translate(m:Matrix2DArray, x:Number, y:Number):Matrix2DArray
Matrix2D["transform"] = Matrix2D_transform; // Matrix2D.transform(m:Matrix2DArray, m11:Number, m12:Number,
                                            //                                     m21:Number, m22:Number,
                                            //                                     dx:Number, dy:Number):Matrix2DArray

// --- implement -------------------------------------------
function Matrix2D_identity() { // @ret Matrix2DArray:
    return [
        1,   // [0] = m11     (a)
        0,   // [1] = m12     (b)
        0,   // [2] = m13
        0,   // [3] = m21     (c)
        1,   // [4] = m22     (d)
        0,   // [5] = m23
        0,   // [6] = m31(dx) (e)
        0,   // [7] = m32(dy) (f)
        1    // [8] = m33
    ];
}

function Matrix2D_multiply(a,   // @arg Matrix2DArray:
                           b) { // @arg Matrix2DArray:
                                // @ret Matrix2DArray: multiplay result
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
        (a[0] * b[0] + a[1] * b[3]),        (a[0] * b[1] + a[1] * b[4]),        0,
        (a[3] * b[0] + a[4] * b[3]),        (a[3] * b[1] + a[4] * b[4]),        0,
        (a[6] * b[0] + a[7] * b[3] + b[6]), (a[6] * b[1] + a[7] * b[4] + b[7]), 1
    ];
}

function Matrix2D_scale(m,   // @arg Matrix2DArray:
                        x,   // @arg Number: scale x
                        y) { // @arg Number: scale y
                             // @ret Matrix2DArray:
//{@assert
    _if(!_type(m, "Array"),  "Matrix2D.scale(m)");
    _if(!_type(x, "Number"), "Matrix2D.scale(,x)");
    _if(!_type(y, "Number"), "Matrix2D.scale(,,y)");
//}@assert

  //return Matrix2D_multiply(m, [ x, 0, 0,
  //                              0, y, 0,
  //                              0, 0, 1 ]);

    return [
        (m[0] * x), (m[1] * x), 0,
        (m[3] * y), (m[4] * y), 0,
         m[6],       m[7],      m[8]
    ];
}

function Matrix2D_rotate(m,       // @arg Matrix2DArray:
                         angle) { // @arg RadianNumber:
                                  // @ret Matrix2DArray:
//{@assert
    _if(!_type(m, "Array"),      "Matrix2D.rotate(m)");
    _if(!_type(angle, "Number"), "Matrix2D.rotate(,angle)");
//}@assert

    var s = Math.sin(angle);
    var c = Math.cos(angle);

  //return Matrix2D_multiply(m, [ c, s, 0,
  //                             -s, c, 0,
  //                              0, 0, 1 ]);

    return [
        (m[0] * c + m[1] * -s), (m[0] * s + m[1] * c), 0,
        (m[3] * c + m[4] * -s), (m[3] * s + m[4] * c), 0,
        (m[6] * c + m[7] * -s), (m[6] * s + m[7] * c), m[8]
    ];
}

function Matrix2D_translate(m,   // @arg Matrix2DArray:
                            x,   // @arg Number:
                            y) { // @arg Number:
                                 // @ret Matrix2DArray:
//{@assert
    _if(!_type(m, "Array"),  "Matrix2D.translate(m)");
    _if(!_type(x, "Number"), "Matrix2D.translate(,x)");
    _if(!_type(y, "Number"), "Matrix2D.translate(,,y)");
//}@assert

    return [
        m[0],                       // m11
        m[1],                       // m12
        0,                          // m13
        m[3],                       // m21
        m[4],                       // m22
        0,                          // m23
        m[0] * x + m[3] * y + m[6], // m31(dx)
        m[1] * x + m[4] * y + m[7], // m32(dy)
        m[2] * x + m[5] * y + m[8]  // m33
    ];
}

function Matrix2D_transform(m,    // @arg Matrix2DArray:
                            m11,  // @arg Number: m11 value
                            m12,  // @arg Number: m12 value
                            m21,  // @arg Number: m21 value
                            m22,  // @arg Number: m22 value
                            dx,   // @arg Number: dx value
                            dy) { // @arg Number: dy value
                                  // @ret Matrix2DArray:
//{@assert
    _if(!_type(m, "Array"),    "Matrix2D.transform(m)");
    _if(!_type(m11, "Number"), "Matrix2D.transform(,m11)");
    _if(!_type(m12, "Number"), "Matrix2D.transform(,,m12)");
    _if(!_type(m21, "Number"), "Matrix2D.transform(,,,m21)");
    _if(!_type(m22, "Number"), "Matrix2D.transform(,,,,m22)");
    _if(!_type(dx, "Number"),  "Matrix2D.transform(,,,,,dx)");
    _if(!_type(dy, "Number"),  "Matrix2D.transform(,,,,,,dy)");
//}@assert

    return [
        m[0] * m11 + m[3] * m12,       // m11
        m[1] * m11 + m[4] * m12,       // m12
        0,                             // m13
        m[0] * m21 + m[3] * m22,       // m21
        m[1] * m21 + m[4] * m22,       // m22
        0,                             // m23
        m[0] * dx  + m[3] * dy + m[6], // m31(dx)
        m[1] * dx  + m[4] * dy + m[7], // m32(dy)
        m[2] * dx  + m[5] * dy + m[8]  // m33
    ];
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


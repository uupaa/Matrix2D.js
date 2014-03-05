function FakeCSSMatrix() {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.e = 0;
    this.f = 0;
}
FakeCSSMatrix.prototype = {
    constructor: FakeCSSMatrix,
    multiply: function(b) {
        return _toCSSMatrix(
                    Matrix2D.multiply(
                        [b.a, b.b, 0, b.c, b.d, 0, b.e, b.f, 1],
                        [this.a, this.b, 0, this.c, this.d, 0, this.e, this.f, 1]));
    },
    scale: function(x, y) {
        return _toCSSMatrix(
                    Matrix2D.scale(
                        [this.a, this.b, 0, this.c, this.d, 0, this.e, this.f, 1],
                        x, y));
    },
    rotate: function(angle) {
        return _toCSSMatrix(
                    Matrix2D.rotate(
                        [this.a, this.b, 0, this.c, this.d, 0, this.e, this.f, 1],
                        deg2rad(angle)));
    },
    translate: function(tx, ty) {
        return _toCSSMatrix(
                    Matrix2D.translate(
                        [this.a, this.b, 0, this.c, this.d, 0, this.e, this.f, 1],
                        tx, ty));
    }
};

// ------------------------------------------------------------

new Test().add([
        testMatrix2D,
        testMatrix2D_identity,
        testMatrix2D_multiply,
        testMatrix2D_scale,
        testMatrix2D_rotate,
        testMatrix2D_translate,
        testMatrix2D_transform,

    ]).run().worker(function(err, test) {
        if (!err && typeof Matrix2D_ !== "undefined") {
            var undo = Test.swap(Matrix2D, Matrix2D_);

            new Test(test).run(function(err, test) {
                Test.undo(undo);
            });
        }
    });

function rad2deg(radians) { // @arg RadiansNumber: from 0 to Math.PI * 2
                            // @ret DegreesNumber: from 0 to 360
    return radians * 180 / Math.PI;
}
function deg2rad(degrees) { // @arg DegreesNumber: from 0 to 360
                            // @ret RadiansNumber: from 0 to Math.PI * 2
    return degrees * Math.PI / 180;
}


function _toCSSMatrix(m) {
    var r;

    if (typeof WebKitCSSMatrix === "undefined") {
        r = new FakeCSSMatrix();
    } else {
        r = new WebKitCSSMatrix();
    }
    r.a = m[0];
    r.b = m[1];

    r.c = m[3];
    r.d = m[4];

    r.e = m[6];
    r.f = m[7];
    return r;
}

function testMatrix2D(next) {

    if (true) {
        console.log("testMatrix2D ok");
        next && next.pass();
    } else {
        console.log("testMatrix2D ng");
        next && next.miss();
    }
}

function testMatrix2D_identity(next) {
    var result = Matrix2D.identity();

    if (result.join() === "1,0,0,0,1,0,0,0,1") {
        console.log("testMatrix2D_identity ok");
        next && next.pass();
    } else {
        console.log("testMatrix2D_identity ng");
        next && next.miss();
    }
}


function testMatrix2D_multiply(next) {
    var a = [0.5, 0,   0,
             0,   0.5, 0,
             2,   2,   1];
    var b = [2,   0,   0,
             0,   2,   0,
             0,   0,   1];
    var result1 = _toCSSMatrix(Matrix2D.multiply(a, b));
    var result2 = _toCSSMatrix(b).multiply( _toCSSMatrix(a) );

    if (result1.a.toFixed(9) === result2.a.toFixed(9) &&
        result1.b.toFixed(9) === result2.b.toFixed(9) &&
        result1.c.toFixed(9) === result2.c.toFixed(9) &&
        result1.d.toFixed(9) === result2.d.toFixed(9) &&
        result1.e.toFixed(9) === result2.e.toFixed(9) &&
        result1.f.toFixed(9) === result2.f.toFixed(9)) {

        console.log("testMatrix2D_multiply ok");
        next && next.pass();
    } else {
        console.log("testMatrix2D_multiply ng");
        next && next.miss();
    }
}

function testMatrix2D_scale(next) {
    var m = [1, 0, 0,
             0, 1, 0,
             0, 0, 1];
    var result1 = _toCSSMatrix( Matrix2D.scale(m, 2, 2) );
    var result2 = _toCSSMatrix(m).scale(2, 2);

    if (result1.a.toFixed(9) === result2.a.toFixed(9) &&
        result1.b.toFixed(9) === result2.b.toFixed(9) &&
        result1.c.toFixed(9) === result2.c.toFixed(9) &&
        result1.d.toFixed(9) === result2.d.toFixed(9) &&
        result1.e.toFixed(9) === result2.e.toFixed(9) &&
        result1.f.toFixed(9) === result2.f.toFixed(9)) {

        console.log("testMatrix2D_scale ok");
        next && next.pass();
    } else {
        console.log("testMatrix2D_scale ng");
        next && next.miss();
    }
}


function testMatrix2D_rotate(next) {
    var m = [1, 0, 0,
             0, 1, 0,
             0, 0, 1];

    var degrees = 45;
    var result1 = _toCSSMatrix( Matrix2D.rotate(m, deg2rad(degrees)) );
    var result2 = _toCSSMatrix(m).rotate(degrees);

//var div = document.createElement("div");
//document.body.appendChild(div);
//div.style.cssText = "-webKit-transform:rotate(45deg);position:absolute;width:100px;height:100px;top:100px;left:100px;border:1px solid green;background-color:blue";
//console.log(window.getComputedStyle(div).webkitTransform); // matrix(0.7071067811865476, 0.7071067811865475, -0.7071067811865475, 0.7071067811865476, 0, 0)

    if (result1.a.toFixed(9) === result2.a.toFixed(9) &&
        result1.b.toFixed(9) === result2.b.toFixed(9) &&
        result1.c.toFixed(9) === result2.c.toFixed(9) &&
        result1.d.toFixed(9) === result2.d.toFixed(9) &&
        result1.e.toFixed(9) === result2.e.toFixed(9) &&
        result1.f.toFixed(9) === result2.f.toFixed(9)) {

        console.log("testMatrix2D_rotate ok");
        next && next.pass();
    } else {
        console.log("testMatrix2D_rotate ng");
        next && next.miss();
    }
}

function testMatrix2D_translate(next) {
    var m = [1, 0, 0,
             0, 1, 0,
             0, 0, 1];
    var result1 = _toCSSMatrix( Matrix2D.translate(m, 2, 2) );
    var result2 = _toCSSMatrix(m).translate(2, 2);

    if (result1.a.toFixed(9) === result2.a.toFixed(9) &&
        result1.b.toFixed(9) === result2.b.toFixed(9) &&
        result1.c.toFixed(9) === result2.c.toFixed(9) &&
        result1.d.toFixed(9) === result2.d.toFixed(9) &&
        result1.e.toFixed(9) === result2.e.toFixed(9) &&
        result1.f.toFixed(9) === result2.f.toFixed(9)) {

        console.log("testMatrix2D_translate ok");
        next && next.pass();
    } else {
        console.log("testMatrix2D_translate ng");
        next && next.miss();
    }
}

function testMatrix2D_transform(next) {
    var m = [0.5, 0,   0,
             0,   0.5, 0,
             2,   2,   1];
    var m11 = 2;
    var m12 = 2;
    var m21 = 2;
    var m22 = 2;
    var dx  = 4;
    var dy  = 5;

    var result1 = _toCSSMatrix(Matrix2D.transform(m, m11, m12, m21, m22, dx, dy));
    var result2 = _toCSSMatrix(m).multiply( _toCSSMatrix([m11, m12, 0, m21, m22, 0, dx, dy, 1]) );

    if (result1.a.toFixed(9) === result2.a.toFixed(9) &&
        result1.b.toFixed(9) === result2.b.toFixed(9) &&
        result1.c.toFixed(9) === result2.c.toFixed(9) &&
        result1.d.toFixed(9) === result2.d.toFixed(9) &&
        result1.e.toFixed(9) === result2.e.toFixed(9) &&
        result1.f.toFixed(9) === result2.f.toFixed(9)) {

        console.log("testMatrix2D_transform ok");
        next && next.pass();
    } else {
        console.log("testMatrix2D_transform ng");
        next && next.miss();
    }
}


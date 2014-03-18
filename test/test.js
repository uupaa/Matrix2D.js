function createSVGMatrix(m) { // @arg Object { a,b,c,d,e,f }

    if (typeof document === "undefined" ||
        typeof document.createElementNS === "undefined") {

        return create2DMatrix(m);
    }

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var rv = svg.createSVGMatrix();

    if (m) {
        rv.a = m.a;
        rv.b = m.b;
        rv.c = m.c;
        rv.d = m.d;
        rv.e = m.e;
        rv.f = m.f;
    }
    return rv;
}

function createCSSMatrix(m) { // @arg Object { a,b,c,d,e,f }

    if (typeof WebKitCSSMatrix === "undefined") {
        return create2DMatrix(m);
    }

    var rv = new WebKitCSSMatrix();

    if (m) {
        rv.a = m.a;
        rv.b = m.b;
        rv.c = m.c;
        rv.d = m.d;
        rv.e = m.e;
        rv.f = m.f;
    }
    return rv;
}

function create2DMatrix(m) { // @arg Object { a,b,c,d,e,f }
    var rv = new FakeMatrix();

    if (m) {
        rv.a = m.a;
        rv.b = m.b;
        rv.c = m.c;
        rv.d = m.d;
        rv.e = m.e;
        rv.f = m.f;
    }
    return rv;
}

function isMatch(a, b) {
    if (a.a.toFixed(9) === b.a.toFixed(9) &&
        a.b.toFixed(9) === b.b.toFixed(9) &&
        a.c.toFixed(9) === b.c.toFixed(9) &&
        a.d.toFixed(9) === b.d.toFixed(9) &&
        a.e.toFixed(9) === b.e.toFixed(9) &&
        a.f.toFixed(9) === b.f.toFixed(9)) {

        return true;
    }
    return false;
}

// ----------------------------------------------------
function FakeMatrix() {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.e = 0;
    this.f = 0;
}
FakeMatrix.fromArray = function(array) {
    var r = new FakeMatrix();

    r.a = array[Matrix2D.A];
    r.b = array[Matrix2D.B];
    r.c = array[Matrix2D.C];
    r.d = array[Matrix2D.D];
    r.e = array[Matrix2D.E];
    r.f = array[Matrix2D.F];
    return r;
};
FakeMatrix.prototype = {
    constructor: FakeMatrix,
    multiply: function(b) {
        var rv = Matrix2D.multiply(
                        [this.a, this.b, 0, this.c, this.d, 0, this.e, this.f, 1],
                        [b.a, b.b, 0, b.c, b.d, 0, b.e, b.f, 1]);
        return FakeMatrix.fromArray(rv);
    },
    scale: function(x, y) {
        var rv = Matrix2D.scale(
                        [this.a, this.b, 0, this.c, this.d, 0, this.e, this.f, 1],
                        x, y);
        return FakeMatrix.fromArray(rv);
    },
    rotate: function(angle) {
        var rv = Matrix2D.rotate(
                        [this.a, this.b, 0, this.c, this.d, 0, this.e, this.f, 1],
                        angle);
        return FakeMatrix.fromArray(rv);
    },
    translate: function(tx, ty) {
        var rv = Matrix2D.translate(
                        [this.a, this.b, 0, this.c, this.d, 0, this.e, this.f, 1],
                        tx, ty);
        return FakeMatrix.fromArray(rv);
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
        testMatrix2D_translate2,
        testMatrix2D_transform,

    ]).run(function(err, test) {
        if (1) {
            err || test.worker(function(err, test) {
                if (!err && typeof Matrix2D_ !== "undefined") {
                    var name = Test.swap(Matrix2D, Matrix2D_);

                    new Test(test).run(function(err, test) {
                        Test.undo(name);
                    });
                }
            });
        }
    });

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
    var a = { a: 0.5, b: 0, c: 0, d: 0.5, e: 2, f: 1 };
    var b = { a: 2,   b: 0, c: 0, d: 2,   e: 4, f: 2 };

    var result1 = create2DMatrix(a).multiply( create2DMatrix(b) );
    var result2 = createCSSMatrix(a).multiply( createCSSMatrix(b) );
    var result3 = createSVGMatrix(a).multiply( createSVGMatrix(b) );

    if ( isMatch(result2, result3) ) {
        if ( isMatch(result1, result2) ) {
            console.log("testMatrix2D_multiply ok");
            next && next.pass();
            return;
        }
    }
    console.log("testMatrix2D_multiply ng");
    next && next.miss();
}

function testMatrix2D_scale(next) {
    var m = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

    var result1 = create2DMatrix(m).scale(2, 2);
    var result2 = createCSSMatrix(m).scale(2, 2);
    var result3 = createSVGMatrix(m).scale(2, 2);

    if ( isMatch(result2, result3) ) {
        if ( isMatch(result1, result2) ) {
            console.log("testMatrix2D_scale ok");
            next && next.pass();
            return;
        }
    }
    console.log("testMatrix2D_scale ng");
    next && next.miss();
}


function testMatrix2D_rotate(next) {
    var m = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

    var degrees = 45;
    var result1 = create2DMatrix(m).rotate(degrees);
    var result2 = createCSSMatrix(m).rotate(degrees);
    var result3 = createSVGMatrix(m).rotate(degrees);

//var div = document.createElement("div");
//document.body.appendChild(div);
//div.style.cssText = "-webKit-transform:rotate(45deg);position:absolute;width:100px;height:100px;top:100px;left:100px;border:1px solid green;background-color:blue";
//console.log(window.getComputedStyle(div).webkitTransform); // matrix(0.7071067811865476, 0.7071067811865475, -0.7071067811865475, 0.7071067811865476, 0, 0)

    if ( isMatch(result2, result3) ) {
        if ( isMatch(result1, result2) ) {
            console.log("testMatrix2D_rotate ok");
            next && next.pass();
            return;
        }
    }
    console.log("testMatrix2D_rotate ng");
    next && next.miss();
}

function testMatrix2D_translate(next) {
    var m = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

    var result1 = create2DMatrix(m).translate(2, 2);
    var result2 = createCSSMatrix(m).translate(2, 2);
    var result3 = createSVGMatrix(m).translate(2, 2);

    if ( isMatch(result2, result3) ) {
        if ( isMatch(result1, result2) ) {
            console.log("testMatrix2D_translate ok");
            next && next.pass();
            return;
        }
    }
    console.log("testMatrix2D_translate ng");
    next && next.miss();
}

function testMatrix2D_translate2(next) {
    var m = { a: 2, b: 0.5, c: 0.5, d: 10, e: 0.1, f: 0.2 };

    var result1 = create2DMatrix(m).translate(3, 2);
    var result2 = createCSSMatrix(m).translate(3, 2);
    var result3 = createSVGMatrix(m).translate(3, 2);

    if ( isMatch(result2, result3) ) {
        if ( isMatch(result1, result2) ) {
            console.log("testMatrix2D_translate2 ok");
            next && next.pass();
            return;
        }
    }
    console.log("testMatrix2D_translate2 ng");
    next && next.miss();
}

function testMatrix2D_transform(next) {
    var m = { a: 0.5, b: 7, c: 88, d: 0.5, e: 2.1, f: 2 };
    var a = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };

    var result1 = create2DMatrix(m).multiply( create2DMatrix(a) );
    var result2 = createCSSMatrix(m).multiply( createCSSMatrix(a) );
    var result3 = createSVGMatrix(m).multiply( createSVGMatrix(a) );

    if ( isMatch(result2, result3) ) {
        if ( isMatch(result1, result2) ) {
            console.log("testMatrix2D_transform ok");
            next && next.pass();
            return;
        }
    }
    console.log("testMatrix2D_transform ng");
    next && next.miss();
}


$(function() {

    module("block");

    test("toFunction", function () {
        var block0 = $.ku4block(function(x){ return x + 1 }),
            block1 = $.ku4block("function(x){ return x + 1 }"),
            block2 = $.ku4block("^(x){ return x + 1 }");

        expect(3);
        ok($.isFunction(block0.toFunction()));
        ok($.isFunction(block1.toFunction()));
        ok($.isFunction(block2.toFunction()));
    });

    test("execute single argument", function () {
        var block0 = $.ku4block(function(x){ return x + 1 }),
            block1 = $.ku4block("function(x){ return x + 1 }"),
            block2 = $.ku4block("^(x){ return x + 1 }");

        expect(3);
        equal(block0.execute(5), 6);
        equal(block1.execute(5), 6);
        equal(block2.execute(5), 6);
    });

    test("execute multiple argument", function () {
        var block0 = $.ku4block(function(x, y, z, zzz){ return [x + 1, y, z, zzz]; }),
            block1 = $.ku4block("function(x, y, z, zzz){ return [x + 1, y, z, zzz]; }"),
            block2 = $.ku4block("^(x, y, z, zzz){ return [x + 1, y, z, zzz]; }"),
            result0 = block0.execute(5, "a", new Date(2014, 1, 1), { a:1, b:2, c:3 }),
            result1 = block1.execute(5, "a", new Date(2014, 1, 1), { a:1, b:2, c:3 }),
            result2 = block2.execute(5, "a", new Date(2014, 1, 1), { a:1, b:2, c:3 });

        expect(12);
        equal(result0[0], 6);
        equal(result1[0], 6);
        equal(result2[0], 6);
        equal(result1[1], "a");
        equal(result1[1], "a");
        equal(result2[1], "a");
        deepEqual(result0[2], new Date(2014, 1, 1));
        deepEqual(result1[2], new Date(2014, 1, 1));
        deepEqual(result2[2], new Date(2014, 1, 1));
        deepEqual(result0[3], { a:1, b:2, c:3 });
        deepEqual(result1[3], { a:1, b:2, c:3 });
        deepEqual(result2[3], { a:1, b:2, c:3 });
    });

    test("execute multiple argument tight", function () {
        var block0 = $.ku4block(function(zz,z,zzzzz,zzz){ return [zzz,z,zz,zzzzz]; }),
            block1 = $.ku4block("function(zz,z,zzzzz,zzz){ return [zzz,z,zz,zzzzz]; }"),
            block2 = $.ku4block("^(zz,z,zzzzz,zzz){ return [zzz,z,zz,zzzzz]; }"),
            result0 = block0.execute(5, "a", new Date(2014, 1, 1), { a:1, b:2, c:3 }),
            result1 = block1.execute(5, "a", new Date(2014, 1, 1), { a:1, b:2, c:3 }),
            result2 = block2.execute(5, "a", new Date(2014, 1, 1), { a:1, b:2, c:3 });

        expect(12);
        equal(result0[2], 5);
        equal(result1[2], 5);
        equal(result2[2], 5);
        equal(result0[1], "a");
        equal(result1[1], "a");
        equal(result2[1], "a");
        deepEqual(result0[3], new Date(2014, 1, 1));
        deepEqual(result1[3], new Date(2014, 1, 1));
        deepEqual(result2[3], new Date(2014, 1, 1));
        deepEqual(result0[0], { a:1, b:2, c:3 });
        deepEqual(result1[0], { a:1, b:2, c:3 });
        deepEqual(result2[0], { a:1, b:2, c:3 });
    });

    test("execute multiple argument spaced", function () {
        var block0 = $.ku4block(function (zz, z, zzzzz, zzz){ return [zzz,z,zz,zzzzz]; }),
            block1 = $.ku4block("function (zz, z, zzzzz, zzz){ return [zzz,z,zz,zzzzz]; }"),
            block2 = $.ku4block("^(zz, z, zzzzz, zzz){ return [zzz,z,zz,zzzzz]; }"),
            result0 = block0.execute(5, "a", new Date(2014, 1, 1), { a:1, b:2, c:3 }),
            result1 = block1.execute(5, "a", new Date(2014, 1, 1), { a:1, b:2, c:3 }),
            result2 = block2.execute(5, "a", new Date(2014, 1, 1), { a:1, b:2, c:3 });

        expect(12);
        equal(result0[2], 5);
        equal(result1[2], 5);
        equal(result2[2], 5);
        equal(result0[1], "a");
        equal(result1[1], "a");
        equal(result2[1], "a");
        deepEqual(result0[3], new Date(2014, 1, 1));
        deepEqual(result1[3], new Date(2014, 1, 1));
        deepEqual(result2[3], new Date(2014, 1, 1));
        deepEqual(result0[0], { a:1, b:2, c:3 });
        deepEqual(result1[0], { a:1, b:2, c:3 });
        deepEqual(result2[0], { a:1, b:2, c:3 });
    });

    test("execute complex function with simple arguments", function () {
        var block0 = $.ku4block(function(x, y, z){ return $.money(x).add($.money(y)).value() / z; }),
            block1 = $.ku4block("function(x, y, z){ return $.money(x).add($.money(y)).value() / z; }"),
            block2 = $.ku4block("^(x, y, z){ return $.money(x).add($.money(y)).value() / z; }");

        expect(3);
        equal(block0.execute(5, 4, 3), 3);
        equal(block1.execute(5, 4, 3), 3);
        equal(block2.execute(5, 4, 3), 3);
    });

    test("execute complex function with simple arguments", function () {
        var block0 = $.ku4block(function(xxxx, yyyy, zzzz){ return $.money(xxxx).add($.money(yyyy)).value() / zzzz * zzzz; }),
            block1 = $.ku4block("function(xxxx, yyyy, zzzz){ return $.money(xxxx).add($.money(yyyy)).value() / zzzz * zzzz; }"),
            block2 = $.ku4block("^(xxxx, yyyy, zzzz){ return $.money(xxxx).add($.money(yyyy)).value() / zzzz * zzzz; }");

        expect(3);
        equal(block0.execute(5, 4, 3), 9);
        equal(block1.execute(5, 4, 3), 9);
        equal(block2.execute(5, 4, 3), 9);
    });

    test("execute complex function with commonn name arguments", function () {
        var block0 = $.ku4block(function(other, multiplier){ return $.money(4.15).add(other).multiply(multiplier); }),
            block1 = $.ku4block("function(other, multiplier){ return $.money(4.15).add(other).multiply(multiplier); }"),
            block2 = $.ku4block("^(other, multiplier){ return $.money(4.15).add(other).multiply(multiplier); }");

        expect(3);
        ok(block0.execute($.money(5), 4).equals($.money(36.60)));
        ok(block1.execute($.money(5), 4).equals($.money(36.60)));
        ok(block2.execute($.money(5), 4).equals($.money(36.60)));
    });

    test("execute complex function with no arguments", function () {
        var block0 = $.ku4block(function(){ return 1; }),
            block1 = $.ku4block("function(){ return 1; }"),
            block2 = $.ku4block("^(){ return 1; }");

        expect(3);
        equal(block0.execute(), 1);
        equal(block1.execute(), 1);
        equal(block2.execute(), 1);
    });

    test("execute block with self executing function", function () {
        var block0 = $.ku4block("function (){ return (function(x){ return x+1 })(1) }"),
            block1 = $.ku4block("function (){ return (function(x){ return x+1 })(1) }"),
            block2 = $.ku4block("^(){ return (function(x){ return x+1 })(1) }");

        expect(3);
        equal(block0.execute(), 2);
        equal(block1.execute(), 2);
        equal(block2.execute(), 2);
    });
});
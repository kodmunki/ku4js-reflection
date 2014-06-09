$(function(){

    module("class | call async");

    asyncTest("call async", function() {
        expect(2);
        function callback(err, arg) {
            equal(err, null);
            equal(arg, null);
            start();
        }

        $.ku4reflection.invoke("$.asyncStub", [], "callAsync", [null, "__CALLBACK__", null], callback);
    });

    asyncTest("call async with args", function() {
        expect(2);
        function callback(err, arg) {
            equal(err, false);
            equal(arg, 1);
            start();
        }

        $.ku4reflection.invoke("$.asyncStub", [], "callAsync", [false, "__CALLBACK__", 1], callback);
    });

    test("call async with invalid args", function() {
        expect(1);
        raises(function(){ $.ku4reflection.invoke("$.asyncStub", [], "callAsync", "__CALLBACK__", callback); });
    });

    test("call async with no callback", function() {
        expect(1);
        raises(function(){ $.ku4reflection.invoke("$.asyncStub", [], "callAsync", [false, "", 1], callback); });
    });

});
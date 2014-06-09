$(function(){

    module("class | call async");

    asyncTest("call object async null args", function() {
        expect(2);
        function callback(err, arg) {
            equal(err, null);
            equal(arg, null);
            start();
        }

        $.ku4reflection.invoke("$.asyncStub", [], {"callAsync": [null, "__CALLBACK__", null]}, callback);
    });

    asyncTest("call object async undefined args", function() {
        expect(2);
        function callback(err, arg) {
            equal(err, null);
            equal(arg, null);
            start();
        }

        $.ku4reflection.invoke("$.asyncStub", [], {"callAsync": [undefined, "__CALLBACK__", undefined]}, callback);
    });

    test("call object async empty args", function() {
        expect(1);
        raises(function() { $.ku4reflection.invoke("$.asyncStub", [], {"callAsync": []}, callback); });
    });

    test("call object async with invalid args", function() {
        expect(1);
        raises(function() { $.ku4reflection.invoke("$.asyncStub", [], {"callAsync": "."}, callback); });
    });
});
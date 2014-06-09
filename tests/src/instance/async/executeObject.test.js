$(function(){

    module("instance | execute async");

    asyncTest("execute object async null args", function() {
        var instance = $.asyncStub();

        expect(2);
        function callback(err, arg) {
            equal(err, null);
            equal(arg, null);
            start();
        }

        $.ku4reflection.execute(instance, {"callAsync": [null, "__CALLBACK__", null]}, callback);
    });

    asyncTest("execute object async undefined args", function() {
        var instance = $.asyncStub();

        expect(2);
        function callback(err, arg) {
            equal(err, null);
            equal(arg, null);
            start();
        }

        $.ku4reflection.execute(instance, {"callAsync": [undefined, "__CALLBACK__", undefined]}, callback);
    });

    test("execute object async empty args", function() {
        expect(1);
        raises(function() { $.ku4reflection.execute(instance, {"callAsync": []}, callback); });
    });

    test("execute object async with invalid args", function() {
        expect(1);
        raises(function() { $.ku4reflection.execute(instance, {"callAsync": "."}, callback); });
    });
});
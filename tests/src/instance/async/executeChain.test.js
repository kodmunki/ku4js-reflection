$(function(){

    module("instance | execute async chain");

    asyncTest("execute async", function() {
        var instance = $.asyncStub();

        expect(2);
        function callback(err, arg) {
            equal(err, false);
            equal(arg, null);
            start();
        }

        $.ku4reflection.execute(instance, [
            {"onSuccess":["__CALLBACK__"]},
            {"callSuccess": []}], callback);
    });

    asyncTest("execute async with args", function() {
        var instance = $.asyncStub();

        expect(2);
        function callback(err, arg) {
            equal(err, false);
            equal(arg, 5);
            start();
        }

        $.ku4reflection.execute(instance, [
            {"onSuccess":["__CALLBACK__"]},
            {"callSuccess": [5]}], callback);
    });

    test("execute async with invalid args", function() {
        var instance = $.asyncStub();

        expect(1);
        raises(function() { $.ku4reflection.execute(instance, [
            {"onSuccess":"__CALLBACK__"},
            {"callSuccess": "5"}], callback); });
    });
});
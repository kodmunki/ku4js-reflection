$(function(){

    module("class | call async chain");

    asyncTest("call async", function() {
        expect(2);
        function callback(err, arg) {
            equal(err, false);
            equal(arg, null);
            start();
        }

        $.ku4reflection.invoke("$.asyncStub", [], [
            {"onSuccess":["__CALLBACK__"]},
            {"callSuccess": []}], callback);
    });

    asyncTest("call async with args", function() {
        expect(2);
        function callback(err, arg) {
            equal(err, false);
            equal(arg, 5);
            start();
        }

        $.ku4reflection.invoke("$.asyncStub", [], [
            {"onSuccess":["__CALLBACK__"]},
            {"onError":["__CALLBACK__"]},
            {"callSuccess": [5]}], callback);
    });

    test("call async with invalid args", function() {
        expect(1);
        raises(function() { $.ku4reflection.invoke("$.asyncStub", [], [
            {"onSuccess":"__CALLBACK__"},
            {"callSuccess": "5"}], callback); });
    });

    asyncTest("call async with args", function() {
        expect(2);
        function callback(err, arg) {
            equal(err, false);
            equal(arg, 5);
            start();
        }

        $.ku4reflection.invoke("$.asyncStub", [], [
            {"onSuccess":["^(x) { return __CALLBACK__; }"]},
            {"onError":["^(x) { return __CALLBACK__; }" ]},
            {"callSuccess": [5]}], callback);
    });

    asyncTest("call async with args", function() {
        expect(2);
        function callback(err, arg) {
            equal(err, false);
            equal(arg, 5);
            start();
        }

        $.ku4reflection.invoke("$.asyncStub", [], [
            {"onSuccess":["^(x) { return __CALLBACK__; }"]},
            {"onError":["^(x) { return __CALLBACK__; }" ]},
            {"callSuccess": [5]}], callback);
    });
});
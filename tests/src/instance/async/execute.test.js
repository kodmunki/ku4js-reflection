$(function(){

    module("instance | execute async");

    asyncTest("execute async", function() {
        var instance = $.asyncStub();

        expect(2);
        function callback(err, arg) {
            equal(err, null);
            equal(arg, null);
            start();
        }

        $.ku4reflection.execute(instance, "callAsync", [null, "__CALLBACK__", null], callback);
    });

    asyncTest("execute async with args", function() {
        var instance = $.asyncStub();

        expect(2);
        function callback(err, arg) {
            equal(err, false);
            equal(arg, 1);
            start();
        }

        $.ku4reflection.execute(instance, "callAsync", [false, "__CALLBACK__", 1], callback);
    });

    test("execute async with invalid args", function() {
        var instance = $.asyncStub();
        expect(1);
        raises(function(){ $.ku4reflection.execute(instance, "callAsync", "__CALLBACK__", callback); });
    });

    test("execute async with no callback", function() {
        var instance = $.asyncStub();
        expect(1);
        raises(function(){ $.ku4reflection.execute(instance, "callAsync", [false, "", 1], callback); });
    });

    asyncTest("execute async with continued processing", function () {
        var instance = $.ku4indexedDbStore();

        expect(2);
        function callback(err, store) {
            equal(err, null);

            store.read("persons", function(err, collection) {
                equal(collection.find({id:1})[0].name, "myName");
                collection.remove();
                start();
            });
        }

        $.ku4reflection.execute(instance, {"read": ["persons",
            "^(err, collection){ collection.insert({id:1, name:'myName'}).save(function(){ __CALLBACK__; }) }"
        ]}, callback);
    });

});
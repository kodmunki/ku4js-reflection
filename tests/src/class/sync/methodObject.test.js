$(function(){

    module("class | call sync object");

    test("call object sync null args", function() {
        var value = $.ku4reflection.invoke("$.money", [1114.15], {"toString": null});

        expect(1);
        equal(value, "$1,114.15");
    });

    test("call object sync undefined args", function() {
        var value = $.ku4reflection.invoke("$.money", [1114.15], {"toString": undefined});

        expect(1);
        equal(value, "$1,114.15");
    });

    test("call object sync empty args", function() {
        var value = $.ku4reflection.invoke("$.money", [1114.15], {"toString": []});

        expect(1);
        equal(value, "$1,114.15");
    });


    test("call object sync with invalid args", function() {
        expect(1);
        raises(function() { $.ku4reflection.invoke("$.money", [1114.15], {"toString": "."}); });
    });

});
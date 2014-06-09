$(function(){

    module("instance | execute sync object");

    test("execute object sync null args", function() {
        var value = $.ku4reflection.execute($.money(1114.15), {"toString": null});

        expect(1);
        equal(value, "$1,114.15");
    });

    test("execute object sync undefined args", function() {
        var value = $.ku4reflection.execute($.money(1114.15), {"toString": undefined});

        expect(1);
        equal(value, "$1,114.15");
    });

    test("execute object sync empty args", function() {
        var value = $.ku4reflection.execute($.money(1114.15), {"toString": []});

        expect(1);
        equal(value, "$1,114.15");
    });


    test("execute object sync with invalid args", function() {
        expect(1);
        raises(function() { $.ku4reflection.execute($.money(1114.15), {"toString": "."}); });
    });

});
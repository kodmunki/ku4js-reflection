$(function(){

    module("instance | execute sync");

    test("execute function", function() {
        var value = $.ku4reflection.execute(function() { return 1; });

        expect(1);
        equal(value, 1);
    });

    test("execute function with args", function() {
        var value = $.ku4reflection.execute(function(x) { return x} , [3]);

        expect(1);
        equal(value, 3);
    });

    test("execute function with invalid args", function() {
        expect(1);
        raises(function(){ $.ku4reflection.execute(function(x) { return x} , 3); });
    });

    test("execute sync", function() {
        var value = $.ku4reflection.execute($.money(4.15), "toString");

        expect(1);
        equal(value, "$4.15");
    });

    test("execute sync with args", function() {
        var value = $.ku4reflection.execute($.phoneNumber(22233344444), "toStringWithFormat", ["(###) ###-####"]);

        expect(1);
        equal(value, "(222) 333-4444");
    });

    test("execute sync with invalid args", function() {
        expect(1);
        raises(function(){ $.ku4reflection.execute($.phoneNumber(22233344444), "toStringWithFormat", "(###) ###-####"); });
    });
});
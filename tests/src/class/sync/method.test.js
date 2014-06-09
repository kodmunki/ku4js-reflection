$(function(){

    module("class | call sync");

    test("call sync", function() {
        var value = $.ku4reflection.invoke("$.math", [], "round", [4.153, -2]);

        expect(1);
        equal(value, 4.15);
    });

    test("call sync", function() {
        var value = $.ku4reflection.invoke("$.money", [4.15], "toString");

        expect(1);
        equal(value, "$4.15");
    });

    test("call sync with args", function() {
        var value = $.ku4reflection.invoke("$.phoneNumber", [22233344444], "toStringWithFormat", ["(###) ###-####"]);

        expect(1);
        equal(value, "(222) 333-4444");
    });

    test("call sync with invalid args", function() {
        expect(1);
        raises(function(){ $.ku4reflection.invoke("$.phoneNumber", [22233344444], "toStringWithFormat", "(###) ###-####"); });
    });
});
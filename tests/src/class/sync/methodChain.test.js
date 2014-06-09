$(function(){

    module("class | call sync chain");

    test("call sync", function() {
        var value = $.ku4reflection.invoke("new Number", [1], [
            "toString",
            {"replace": ["1", "A"]}
        ]);

        expect(1);
        equal(value, "A");
    });

    test("call sync with args", function() {
        var value = $.ku4reflection.invoke("$.money", [4.15], [
            {"add": [$.money(1.15)]},
            {"subtract": [$.money(.30)]},
            "toString"
        ]);

        expect(1);
        equal(value, "$5.00");
    });

    test("call sync with invalid args", function() {
        expect(1);
        raises(function(){
            $.ku4reflection.invoke("$.money", [4.15], [
                {"add": $.money(1.15)},
                {"subtract": $.money(.30)},
                "toString"
            ]);
        });
    });
});
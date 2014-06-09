$(function(){

    module("instance | execute sync chain");

    test("execute sync", function() {
        var value = $.ku4reflection.execute(1, [
            "toString",
            {"replace": ["1", "A"]}
        ]);

        expect(1);
        equal(value, "A");
    });

    test("execute sync with args", function() {
        var value = $.ku4reflection.execute($.money(4.15), [
            {"add": [$.money(1.15)]},
            {"subtract": [$.money(.30)]},
            "toString"
        ]);

        expect(1);
        equal(value, "$5.00");
    });

    test("execute sync with invalid args", function() {
        expect(1);
        raises(function(){
            $.ku4reflection.execute($.money(4.15), [
                {"add": $.money(1.15)},
                {"subtract": $.money(.30)},
                "toString"
            ]);
        });
    });
});
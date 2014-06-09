$(function(){
    module("class instantiate");

    test("instantiate with new", function(){
        var array = $.ku4reflection.instantiate("new Array", [1,2,3,4]);

        expect(5);
        ok(array);
        equal(array[0], 1);
        equal(array[1], 2);
        equal(array[2], 3);
        equal(array[3], 4);
    });

    test("instantiate custom with new", function() {
        TestClass = function Class() { this.property = "property"};
        var value = $.ku4reflection.instantiate("new TestClass", [1]);

        expect(2);
        ok(value);
        equal(value.property, "property");
    });

    test("instantiate with $", function(){
        var money = $.ku4reflection.instantiate("$.money", [4.15, 'B']);

        expect(5);
        ok(money);
        equal(money.dollars(), 4);
        equal($.math.round(money.cents(), -2), .15);
        equal(money.currency(), "B");
        equal(money.value(), 4.15)
    });
});
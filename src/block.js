function ku4block(block) {
    var _block = ($.isFunction(block)) ? block.toString() : block;
    if(!$.ku4block.isBlock(_block))
        throw $.ku4exception("Argument Exception", "ku4blocks take the form ^( /*[arg[, arg]]*/ ){ /*code*/ }" +
                             "\n\nCOMMON REASONS FOR EXCEPTIONS:" +
                             "\n1) Parameters must be a CSV containing no more than one space between commas and the next parameter." +
                             "\n2) The block may not contain leading or trailing space." +
                             "\n3) The format of the block must contain: ^(){}");

    this._block = _block.replace(/^\^/, "function");
}
ku4block.prototype = {
    execute: function() {
        return this.toFunction().apply(null, arguments);
    },
    toFunction: function() {
        return eval("(" + this._block + ")");
    }
};

$.ku4block = function(block) { return new ku4block(block); };
$.ku4block.isBlock = function(value) {
    var _value = ($.isFunction(value)) ? value.toString() : value;
    return /^(?:\^|function)\s?\((?:(?:\w+\,\s?)*\w+)?\)\s?\{[\s\S]*\}$/m.test(_value);
};
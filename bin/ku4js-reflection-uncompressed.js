(function(l){
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

/* Instantiates a Class with the passed constructors
 *
 * NOTE: Returns an instance of money with value B4.13
 * ku4reflection_instantiate("$.money", [4.13, 'B']);
 *
 * NOTE: Returns an instance of CLASS constructed with arguments 1, 2, and 3
 * ku4reflection_instantiate("new CLASS", [1,2,3]);
 */

function ku4reflection_instantiate(Class, constructors) {
    if(!$.isString(Class))
        throw $.ku4exception("Argument Exception", $.str.format("Cannot instantiate non-string values. Class = {0}", Class));

    var containsNew = /^new\s/.test(Class),
        namespace = Class.split("."),
        rootObject = (containsNew)
            ? $.str.format("{0}({1})", Class, $.json.serialize(constructors).replace(/^\[/, "").replace(/\]$/, ""))
            : namespace.shift();

    try {
        var _class = eval("(" + rootObject + ")");
        if (!containsNew) $.list(namespace).each(function (item) {
            _class = _class[item];
        });
        return (containsNew || !$.exists(_class.apply)) ? _class : _class.apply(this, constructors);
    }
    catch(e) {
        throw $.ku4exception("Argument Exception", $.str.format("Cannot instantiate Class = {0}. Is not defined.", Class));
    }
}

/* Executes the method of instance with args, and replaces all args passed
 * as "__CALLBACK__" with the function passed as callback or default return function
 *
 * NOTE: Executes method of CLASS with callback
 * ku4reflection_execute_async(new CLASS(), "method", ["arg", "__CALLBACK__"], function() { console.log("callback") });
 */

function ku4reflection_execute_async(instance, method, args, callback)
{
    var _callback = callback || function() { return;},
        format = "({0}).apply(null, arguments)",
        regexp = /__CALLBACK__/g;

    $.list(args).each(function(arg) {
        var index = args.indexOf(arg);
        if($.ku4block.isBlock(arg)) {
            var block = arg.replace(regexp, $.str.format(format, _callback.toString()));
            args[index] = $.ku4block(block).toFunction();
        }
        else if(regexp.test(arg)) args[index] = _callback;
    });

    return instance[method].apply(instance, args);
}

/* Asynchronously executes method with args on Class with constructors
 */

function ku4reflection_execute_chain_async(instance, methods, callback)
{
    $.list(methods).each(function(method) {
        instance = ($.isString(method))
            ? ku4reflection_execute_async(instance, method, [], callback)
            : ku4reflection_execute_object_async(instance, method, callback);
    });
    return instance;
}

/* Executes the method of instance with args, and replaces all args passed
 * as "__CALLBACK__" with the function passed as callback or default return function
 *
 * NOTE: Executes method of CLASS with callback
 * ku4reflection_execute_async(new CLASS(), "method", ["arg", "__CALLBACK__"], function() { console.log("callback") });
 */

function ku4reflection_execute_object_async(instance, method, callback)
{
    var methodName = $.obj.keys(method)[0],
        args = method[methodName];

    return ku4reflection_execute_async(instance, methodName, args, callback);
}

/* Executes the method of instance with args
 *
 * NOTE: Executes toString with arguments "," and "."
 * ku4reflection_execute_sync($.money(), "toString", [",","."]);
 */

function ku4reflection_execute_sync(instance, method, args)
{
    return instance[method].apply(instance, args);
}


/* Synchronously executes method with args on Class with constructors
 */

function ku4reflection_execute_chain_sync(instance, methods)
{
    $.list(methods).each(function(method) {
        instance = ($.isString(method))
            ? ku4reflection_execute_sync(instance, method)
            : ku4reflection_execute_object_sync(instance, method);
    });
    return instance;
}

/* Executes the method of instance with args
 *
 * NOTE: Executes toString with arguments "," and "."
 * ku4reflection_execute_sync($.money(), "toString", [",","."]);
 */

function ku4reflection_execute_object_sync(instance, method)
{
    var methodName = $.obj.keys(method)[0],
        args = method[methodName];

    return ku4reflection_execute_sync(instance, methodName, args);
}


$.ku4reflection = {
    instantiate: function(Class, constructors) {
        return ku4reflection_instantiate(Class, constructors);
    },
    execute: function() {
        var arg0 = arguments[0],
            args = ($.isArray(arg0)) ? arg0 : $.list.parseArguments(arguments).toArray(),
            arity = args.length,
            instance = args[0],
            arg2 = args[1],
            arg3 = args[2],
            arg4 = args[3];

        if(arity == 4) return ku4reflection_execute_async(instance, arg2, arg3, arg4);
        if(arity == 3 && $.isArray(arg2) && $.isFunction(arg3)) return ku4reflection_execute_chain_async(instance, arg2, arg3);
        if(arity == 3 && $.isObject(arg2) && $.isFunction(arg3)) return ku4reflection_execute_object_async(instance, arg2, arg3);
        if(arity == 3 && $.isArray(arg3)) return ku4reflection_execute_sync(instance, arg2, arg3);
        if(arity == 2 && $.isString(arg2)) return ku4reflection_execute_sync(instance, arg2, arg3);
        if(arity == 2 && $.isObject(arg2)) return ku4reflection_execute_object_sync(instance, arg2);
        if(arity == 2 && !$.isFunction(instance) && $.isArray(arg2)) return ku4reflection_execute_chain_sync(instance, arg2);
        if((arity == 2 && $.isArray(arg2)) || arity == 1) return instance.apply(self, arg2);
        throw $.ku4exception("Argument Exception", "Invalid reflection arguments: " + args);
    },
    invoke: function()
    {
        var arg0 = arguments[0],
            args = ($.isArray(arg0)) ? arg0 : arguments,
            arity = args.length - 1,
            instance = ku4reflection_instantiate(args[0], args[1]),
            arg3 = args[2],
            arg4 = args[3],
            arg5 = args[4];

        if(arity == 4) return this.execute.call(this, instance, arg3, arg4, arg5);
        if(arity == 3) return this.execute.call(this, instance, arg3, arg4);
        if(arity == 2) return this.execute.call(this, instance, arg3);
        if(arity == 1) return this.execute.call(this, instance);
        return this.execute.call(this);
    }
};

})();

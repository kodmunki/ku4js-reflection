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
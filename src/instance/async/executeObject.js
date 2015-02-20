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
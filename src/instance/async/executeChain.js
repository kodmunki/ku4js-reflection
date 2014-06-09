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
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
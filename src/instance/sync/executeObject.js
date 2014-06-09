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

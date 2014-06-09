/* Executes the method of instance with args
 *
 * NOTE: Executes toString with arguments "," and "."
 * ku4reflection_execute_sync($.money(), "toString", [",","."]);
 */

function ku4reflection_execute_sync(instance, method, args)
{
    return instance[method].apply(instance, args);
}

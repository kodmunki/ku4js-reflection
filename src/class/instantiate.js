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
            : namespace.shift(),
        _class = eval("(" + rootObject + ")");

    if(!containsNew)$.list(namespace).each(function (item) {  _class = _class[item];  });
    return (containsNew || !$.exists(_class.apply)) ? _class : _class.apply(this, constructors);
}
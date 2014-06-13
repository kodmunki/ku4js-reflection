#ku4js-reflection

kodmunki™ utilities for JavaScript reflection.

*(The following are the instructions from the build script found in the template at /_build/build.sh)*

####kodmunki™ build process
---

This build process is dependent upon yuicompressor and a specific directory structure:

* root  
 * _build (This build script and the yuicompressor)
 * bin (The compiled scripts will appear here)
 * src (All script files go here)

The following variables found in setup () are
expected to be changed by the developer running
this process:

* PROJNAME (The name of your project)
* STARTMSG (A message to echo at start of build)
* ENDMSG (A message to echo at end of build)

#Documentation

##$.ku4reflection
All reflection methods are called through the $.ku4reflection namespace.

###instantiate
| API | Return | Description |
| --- | --- | --- |
| instantiate(Class:_String_, constructors:_Array_ | Object | return an instance of Class constructed with constructors |

###execute
| API | Return | Description |
| --- | --- | --- |
| execute(func:_Function_) | Object | returns the result of executing func.  |
| execute(func:_Function_, args:_Array_) | Object | returns the result of executing func passing applying args as the arguments |
| execute(instance:_Object_, method:_String_) | Object | returns the result of invoking method of instance. |
| execute(instance:_Object_, method:_Object_) | Object | returns the result of invoking method of instance having method name key and method args value, where the value of the method object is an array of arguments for the method. |
| execute(instance:_Object_, methods:_Array_) | Object | returns the result of invoking the chain of methods represented by an array of method objects. |
| execute(instance:_Object_, method:_String_, args:_Array_) | Object | returns the result of invoking method of instance with args |
| execute(instance:_Object_, method:_Object_, callback:_Function_) | void | invokes method of instance having method name key and method args value, where the value of the method object is an array of arguments for the method. The callback is inserted inserted for all instances of arg == "\_\_CALLBACK\_\_", and called with the result. |
| execute(instance:_Object_, methods:_Array_, callback_Function_) | void | invokes the chain of methods of instance represented by an array of method objects. The callback is called with the result. The callback is inserted inserted for all instances of arg == "\_\_CALLBACK\_\_", and called with the result. |
| execute(instance:_Object_, method:_String_, args:_Array_, callback:_Function_) | void | invokes method of instance with args. The callback is called with the result. The callback is inserted inserted for all instances of arg == "\_\_CALLBACK\_\_", and called with the result. |

####Examples:
Examples of these methods can be found in the unit tests for execute:
* [sync](https://github.com/kodmunki/ku4js-reflection/tree/master/tests/src/instance/sync)
* [async](https://github.com/kodmunki/ku4js-reflection/tree/master/tests/src/instance/async)

###invoke
| API | Return | Description |
| --- | --- | --- |
| invoke(Class:_String_, constructors:_Array_, method:_String_) | Object | returns the result of invoking method of Class constructed with constructors. |
| invoke(Class:_String_, constructors:_Array_, method:_Object_) | Object | returns the result of invoking method of Class constructed with constructors having method name key and method args value, where the value of the method object is an array of arguments for the method. |
| invoke(Class:_String_, constructors:_Array_, methods:_Array_) | Object | returns the result of invoking the chain of methods represented by an array of method objects. |
| invoke(Class:_String_, constructors:_Array_, method:_String_, args:_Array_) | Object | returns the result of invoking method of Class constructed with constructors with args |
| invoke(Class:_String_, constructors:_Array_, method:_Object_, callback:_Function_) | void | invokes method of Class constructed with constructors having method name key and method args value, where the value of the method object is an array of arguments for the method. The callback is inserted inserted for all Class constructed with constructorss of arg == "\_\_CALLBACK\_\_", and called with the result. |
| invoke(Class:_String_, constructors:_Array_, methods:_Array_, callback_Function_) | void | invokes the chain of methods of Class constructed with constructors represented by an array of method objects. The callback is called with the result. The callback is inserted inserted for all Class constructed with constructorss of arg == "\_\_CALLBACK\_\_", and called with the result. |
| invoke(Class:_String_, constructors:_Array_, method:_String_, args:_Array_, callback:_Function_) | void | invokes method of Class constructed with constructors with args. The callback is called with the result. The callback is inserted inserted for all Class constructed with constructorss of arg == "\_\_CALLBACK\_\_", and called with the result. |

####Examples:
Examples of these methods can be found in the unit tests for execute:
* [sync](https://github.com/kodmunki/ku4js-reflection/tree/master/tests/src/class/sync)
* [async](https://github.com/kodmunki/ku4js-reflection/tree/master/tests/src/class/async)

##Blocks
Blocks are an addition that came out of Apple's extension of C. Where blocks open the ability to implement closures in C.
Although JavaScript already includes this feature, the ability to pass functions across processes and threads may arise
in the implementation of async reflection calls. ku4js-reflection blocks allow the developer to pass functions across
threads as arguments to async reflection invocations and include "\_\_CALLBACK\_\_" replacements in withing the block.

Blocks are strings that take the following form:
```javascript
'^([arg1[, arg2[, ...]]]) { /* implementation that may include __CALLBACK__ */ }'
```

Using this, we can see in the following example how a block may be used:

```javascript
$.ku4reflection.invoke("$.service", [], [
    {"uri": ["./"]},
    {"onSuccess": ['^(){  __CALLBACK__; }']},
    {"onError": ['^(){ (function() { __CALLBACK__; })("ERROR"); }']},
    "call"], function() { console.log(arguments); });
```

The above will attempt to call for the current document. If the call is made over http the callback result will be the
text of the document. If the call is made over the file system the browser will likely not allow the call.
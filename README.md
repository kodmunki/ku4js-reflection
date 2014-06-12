#ku4js-reflection

kodmunki™ utilities for JavaScript Web Reflection.

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
_Complete Documentation Coming Soon_

| API | Return | Description |
| --- | --- | --- |
| execute(func:_Function_) | Object |  |
| execute(func:_Function_, args:_Array_) | Object |  |
| execute(instance:_Object_, method:_String_) | Object |  |
| execute(instance:_Object_, method:_Object_) | Object |  |
| execute(instance:_Object_, method:_Array_) | Object |  |
| execute(instance:_Object_, method:_String_, arguments:_Array_) | Object |  |
| execute(instance:_Object_, method:_Object_, arguments:_Array_) | Object |  |
| execute(instance:_Object_, methods:_Array_, callback_Function_) | void |  |
| execute(instance:_Object_, method:_String_, arguments:_Array_, callback:_Function_) | void |  |

###invoke
_Complete Documentation Coming Soon_

| API | Return | Description |
| --- | --- | --- |
| invoke(Class:_String_, constructors:_Array_, method:_String_) | Object |  |
| invoke(Class:_String_, constructors:_Array_, method:_Object_) | Object |  |
| invoke(Class:_String_, constructors:_Array_, method:_Array_) | Object |  |
| invoke(Class:_String_, constructors:_Array_, method:_String_, arguments:_Array_) | Object |  |
| invoke(Class:_String_, constructors:_Array_, method:_Object_, arguments:_Array_) | Object |  |
| invoke(Class:_String_, constructors:_Array_, methods:_Array_, callback_Function_) | void |  |
| invoke(Class:_String_, constructors:_Array_, method:_String_, arguments:_Array_, callback:_Function_) | void |  |

##Blocks
_Documentation Coming Soon_
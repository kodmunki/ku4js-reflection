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
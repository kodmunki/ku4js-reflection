function asyncStub() { }
asyncStub.prototype = {
    onSuccess: function(func) {
        this._onSuccess = func;
        return this;
    },
    onError: function(func) {
        this._onError = func;
        return this;
    },
    callSuccess: function(arg) {
        this.callAsync(false, this._onSuccess, arg);
    },
    callError: function(arg) {
        this.callAsync(true, this._onError, arg);
    },
    callAsync: function(err, callback, arg) {
        setTimeout(function() { callback(err, arg); }, 100);
    }
};
$.asyncStub = function() { return new asyncStub(); };
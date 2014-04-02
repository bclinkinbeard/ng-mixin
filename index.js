'use strict';

var _ = require('underscore');

module.exports = function () {

	var proto,
		injections = [];

	// define constructor function
	/*jshint validthis:true */
	function ctor () {
		var i, len, injectName, key, prop;

		// automatically bind methods
		for (key in this) {
			prop = this[key];
			if (typeof prop === 'function') {
				this[key] = _.bind(prop, this);
			}
		}

		// assign injected dependencies as instance properties
		if (ctor.$inject) {
			for (i = 0, len = ctor.$inject.length; i < len; i++) {
				injectName = ctor.$inject[i];
				this[injectName] = arguments[i];
			}
		}

		// call init pseudo-constructor if present
		if (this.init) {
			this.init.apply(this, arguments);
		}
	}

	proto = ctor.prototype;

	for (var i = 0, len = arguments.length; i < len; i++) {
		// merge each set of properties into the prototype
		_.extend(proto, arguments[i]);

		// gather all mixin injections
		if (arguments[i].$inject) {
			injections = injections.concat(arguments[i].$inject);
		}
	}

	// save injection names as a property on constructor
	if (injections.length > 0) {
		ctor.$inject = _.uniq(injections);
	}

	return ctor;
};

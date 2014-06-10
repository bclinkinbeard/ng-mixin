ng-mixin
========

Mixin utility for Angular that makes it easier to write min-safe code, and offers other conveniences.

```js
// MyController.js

var mix = require('ng-mixin');

module.exports = mix({

	$inject: ['$scope', 'myService'],

	init: function ($scope, myService) {
		// constructor logic here
		// this.$scope and this.myService created automatically
		
		$scope.$on('someEvent', this.someHandler);
	},
	
	someHandler: function () {
		// this will still be the module, not the scope
		// thanks to automatic binding
	}
	
});
```

Can also be used like a traditional mixin, merging two or more objects.

```js
// SomeModel.js

var mix = require('ng-mixin'),
	 EventEmitter = require('events').EventEmitter.prototype;

module.exports = mix(EventEmitter, {

	someMethod: function () {
		// we now have event emitting thanks to EventEmitter mixin
		this.emit('someEvent', prop)
	}
	
});
```
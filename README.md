ng-mixin
========

Mixin utility for Angular that makes it easier to write min-safe code

```js
// MyController.js

var mix = require('ng-mixin');

module.exports = mix({
	$inject: ['$scope', 'myService'],

	init: function ($scope, myService) {
		// constructor logic here
		// this.$scope and this.myService created automatically
	}
});
```

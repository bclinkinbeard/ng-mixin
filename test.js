var mix = require('./'),
	test = require('prova');

test('returns a function that can be used as a constructor', function (t) {
	t.plan(2);

	var Test = mix(),
		a = new Test();

	t.equal(typeof Test, 'function');
	t.ok(a instanceof Test);
});

test('accepts one or more objects that will be merged into prototype', function (t) {
	t.plan(2);

	function baz () {}
	var Test = mix({foo: 'bar'}, {fn: baz}),
		a = new Test();

	t.ok(a.foo);
	t.ok(a.fn);
});

test('assigns constructor arguments as properties with matching names', function (t) {
	t.plan(2);

	var Test = mix({ $inject: ['foo', 'bar'] }),
		foo = {},
		bar = {},
		a = new Test(foo, bar);

	t.equal(a.foo, foo);
	t.equal(a.bar, bar);
});

test('handles more than one $inject', function (t) {
	t.plan(1);

	var Test = mix({$inject: ['foo']}, {$inject: ['bar']});

	t.deepEqual(Test.$inject, ['foo', 'bar']);
});

test('does not assign $inject property if not specified in mixins', function (t) {
	t.plan(1);
	t.notOk(mix().$inject);
});

test('complex types passed in are copied by reference', function (t) {
	t.plan(1);

	var Type = mix({ obj: {foo: 'bar'} }),
		a = new Type(),
		b = new Type();
	a.obj.foo = 'baz';

	t.deepEqual(a.obj.foo, b.obj.foo);
});

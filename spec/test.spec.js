'use strict';

let test = require('tape');
let CordoWrap = require('../src');

let cordoWrap = () => new CordoWrap();

test('Contacts.find should fail without mock', t => {
	t.plan(1);
	let c = cordoWrap();
	c.plugins.Contacts.find().catch(() => {
		t.pass('navigator.find should throw OK');
	});
});


test('useDefaultMocks: Contacts.find should return default mocks', t => {
	t.plan(1);
	let c = cordoWrap();
	c.useDefaultMocks();
	let expected = require('../src/plugins/Contacts/mocks/find')();
	c.plugins.Contacts.find().then(result=>{
		t.deepEqual(result, expected);
	}).catch(() => {
		t.fail('navigator.find should NOT throw with mocks');
	});
});

test('setMocks: Contacts.find should return custom mock', t => {
	t.plan(1);
	let c = cordoWrap();
	c.setMocks({
		Contacts: {
			find: () => {
				return 42;
			}
		}
	});
	c.plugins.Contacts.find().then(result=>{
		t.equal(result, 42);
	}).catch(() => {
		t.fail('navigator.find should NOT throw with mocks');
	});
});


//cordoWrap.plugins.Contacts.find().then(contacts => {

const AD = require('../index.js');
const config = require('./importConfig');

const ad = new AD(config).cache(true);

beforeAll(async () => {
	try {
	  	await ad.ou('Test OU 1').remove();
	  	await ad.ou('Test OU 2').remove();
	} catch (e) {}
});

test('ou().add() should not throw', async () => {
	let result = await ad.ou().add({
		name: 'Test OU 1',
		location: '',
		description: 'This is test OU 1.',
	}).catch(err => {
		expect(err).not.toBeDefined();
	});
});

test('ou().add() should return an ou', async () => {
	try {
		let result = await ad.ou().add({
			name: 'Test OU 2',
			location: 'Test OU 1',
			description: 'This is test OU 2.',
		});
	} catch (err) {
		expect(err).not.toBeDefined();
	}
});

test('ou().get() should return all ous', async () => {
	try {
		let results = await ad.ou().get();
		expect(results.length).toBeGreaterThan(1);
		expect(results.filter(r => r.description === 'This is test OU 2.').length).toBe(1);
	}
	catch (err) {
		expect(err).not.toBeDefined();
	}
});

test('ou(ou).get() should find a single ou by CN', async () => {
	let results = await ad.ou('Test OU 2').get();
	expect(results.description).toBe('This is test OU 2.');
});

test('ou(ou).exists() should return true for a given ou', async () => {
	expect(await ad.ou('Test OU 2').exists()).toBe(true);
});

test('ou(ou).exists() should return false for a bs ou', async () => {
	expect(await ad.ou('cheeseburger').exists()).toBe(false);
});

test('ou(ou).remove() should remove the ou.', async () => {
	try {
	  	let result = await ad.ou('Test OU 2').remove();
		expect(result.success).toBe(true);
		let exists = await ad.ou('Test OU 2').exists();
		expect(exists).toBe(false);
	  	await ad.ou('Test OU 1').remove();
	} catch(err) {
		expect(err).not.toBeDefined();
	}
});

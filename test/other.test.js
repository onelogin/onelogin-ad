const AD = require('../index.js');
const config = require('./importConfig');

const ad = new AD(config).cache(true);

beforeAll(async () => {
	try {
		let result = await ad.user().add({
			userName: 'test54',
			firstName: 'Test',
			lastName: '54',
			pass: 'SuperWord4567!!!'
		});
	} catch(err) {

	}
});

test('other().get(opts) should return all non-user/group objects', async () => {
	try {
		let results = await ad.other().get();
		expect(results.length).toBeGreaterThan(1);
		expect(results.filter(r => r.sn === '54').length).toBe(0);
	} catch (err) {
		expect(err).not.toBeDefined();
	}
});

test('all().get(opts) should return all objects', async () => {
	try {
		let results = await ad.all().get();
		expect(results.users).toBeDefined();
		expect(results.groups).toBeDefined();
		expect(results.other).toBeDefined();
		expect(results.users.length).toBeGreaterThan(1);
		expect(results.groups.length).toBeGreaterThan(1);
		expect(results.other.length).toBeGreaterThan(1);
	} catch (err) {
		expect(err).not.toBeDefined();
	}
});

test('ad.find(opts) should return an arbitrary search.', async () => {
	try {
		let results = await ad.find('CN=test 54');
		expect(results.users).toBeDefined();
		expect(results.groups).toBeDefined();
		expect(results.other).toBeDefined();
		expect(results.users.length).toBe(1);
	} catch (err) {
		expect(err).not.toBeDefined();
	}
});

test('caching should clear on timeout', async () => {
	try {
		ad._cache.users = {};
		let start = new Date();
		await ad.user('test54').get();
		expect(new Date() - start).toBeGreaterThan(10);
		
		start = new Date();
		await ad.user('test54').get();
		expect(new Date() - start).toBeLessThan(10);

		ad.cacheTimeout(0);

		start = new Date();
		await ad.user('test54').get();
		expect(new Date() - start).toBeGreaterThan(10);

		ad.cacheTimeout(60000).cache(false);
		await ad.user('test54').get();
		expect(new Date() - start).toBeGreaterThan(10);
	} catch(err) {
		expect(err).toBeUndefined();
	}
});

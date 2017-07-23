
const api = require('../src/util/api');
const wrapAsync = require('../src/util/wrapAsync');

const rowset = [
	{id: 1, animal: 'woodchuck', chuck: 500},
	{id: 2, animal: 'horse',  chuck: 20},
	{id: 3, animal: 'duck',  chuck: 200},
	{id: 4, animal: 'duck',  chuck: 210},
	{id: 5, animal: 'zebra',  chuck: 1},
]

test('api().processResults() should return only certain fields', async () => {
	let result = api.processResults({
		fields: ['id', 'chuck']
	}, rowset);
	expect(result.length).toBe(5);
	expect(result[0].id).toBeDefined();
	expect(result[0].chuck).toBeDefined();
	expect(result[0].animal).toBeUndefined();
});

test('api().processResults() should filter by fields', async () => {
	let result = api.processResults({
		filter: {
			'animal': 'duck',
			'chuck': 200
		}
	}, rowset);
	expect(result.length).toBe(1);
	expect(result[0].id).toBe(3);
});

test('api().processResults() filter _gte ', async () => {
	let result = api.processResults({
		filter: {'chuck_gte': 200}
	}, rowset);
	expect(result.length).toBe(3);
});

test('api().processResults() filter _lte ', async () => {
	let result = api.processResults({
		filter: {'chuck_lte': 20}
	}, rowset);
	expect(result.length).toBe(2);
});

test('api().processResults() filter _gt ', async () => {
	let result = api.processResults({
		filter: {'chuck_gt': 20}
	}, rowset);
	expect(result.length).toBe(3);
});

test('api().processResults() filter _lt ', async () => {
	let result = api.processResults({
		filter: {'chuck_lt': 20}
	}, rowset);
	expect(result.length).toBe(1);
});

test('api().processResults() filter _ne ', async () => {
	let result = api.processResults({
		filter: {'chuck_ne': 20}
	}, rowset);
	expect(result.length).toBe(4);
});

test('api().processResults() filter _like ', async () => {
	let result = api.processResults({
		filter: {'animal_like': 'u'}
	}, rowset);
	expect(result.length).toBe(3);
});

test('api().processResults() should do a full text search', async () => {
	let result = api.processResults({
		q: 'u'
	}, rowset);
	expect(result.length).toBe(3);
});

test('api().processResults() should handle start and end', async () => {
	let result = api.processResults({
		start: 2,
		end: 3,
		fields: ['id']
	}, rowset).map(obj => obj.id).join('');
	expect(result).toBe('23');
});

test('api().processResults() should handle end', async () => {
	let result = api.processResults({
		end: 3,
		fields: ['id']
	}, rowset).map(obj => obj.id).join('');
	expect(result).toBe('123');
});

test('api().processResults() should handle start and limit', async () => {
	let result = api.processResults({
		start: 2,
		limit: 3,
		fields: ['id']
	}, rowset).map(obj => obj.id).join('');
	expect(result).toBe('234');
});

test('api().processResults() should handle page and limit', async () => {
	let result = api.processResults({
		page: 3,
		limit: 2,
		fields: ['id']
	}, rowset).map(obj => obj.id).join('');
	expect(result).toBe('5');
});

test('api().processResults() should handle sort', async () => {
	let result = api.processResults({
		sort: ['id'],
		order: ['DESC'],
		fields: ['id']
	}, rowset).map(obj => obj.id).join('');
	expect(result).toBe('54321');
});

test('wrapAsync should handle success', async () => {
	const prom = new Promise(async (resolve, reject) => {
		resolve('fantastic everything');
	});
	const [error, data] = await wrapAsync(prom);
	expect(data).toBeDefined();
	expect(error).toBeUndefined();
});

test('wrapAsync should handle rejects', async () => {
	const prom = new Promise(async (resolve, reject) => {
		reject('fudge everything');
	});
	const [error, data] = await wrapAsync(prom);
	expect(error).toBeDefined();
	expect(data).toBeUndefined();
});

test('api().processResults() should ', async () => {

});

test('api().processResults() should ', async () => {

});

test('api().processResults() should ', async () => {

});




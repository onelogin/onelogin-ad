const AD = require('../index.js');
const config = require('./importConfig');

const ad = new AD(config).cache(true);

beforeAll(async () => {
  try {
    await ad.group('Test Group 1').remove();
    await ad.group('Test Group 2').remove();
  } catch (e) {}
});

test('group().add() should not throw', async () => {
  let result = await ad
    .group()
    .add({
      name: 'Test Group 1',
      location: '',
      description: 'This is test group 1.'
    })
    .catch(err => {
      expect(err).not.toBeDefined();
    });
});

test('group().add() should return a group', async () => {
  let result = await ad
    .group()
    .add({
      name: 'Test Group 2',
      location: '!Builtin',
      description: 'This is test group 2.'
    })
    .catch(err => {
      expect(err).not.toBeDefined();
    });
});

test('group().get() should return all groups', async () => {
  try {
    let results = await ad.group().get();
    expect(results.length).toBeGreaterThan(1);
    expect(results.filter(r => r.cn === 'Test Group 2').length).toBe(1);
  } catch (err) {
    expect(err).not.toBeDefined();
  }
});

test('group(group).get() should find a single group by CN', async () => {
  let results = await ad.group('Test Group 2').get();
  expect(results.description).toBe('This is test group 2.');
});

test('group(group).get() should handle accept a suffix', async () => {
  let results = await ad.group('Test Group 2@' + config.domain).get();
  expect(results.description).toBe('This is test group 2.');
});

test('group(group).exists() should return true for a given group', async () => {
  expect(await ad.group('Test Group 2').exists()).toBe(true);
});

test('group(group).exists() should return false for a bs group', async () => {
  expect(await ad.group('stachelrodt').exists()).toBe(false);
});

test('group(group).addUser(user) should add a user', async () => {
  let addResult = await ad
    .group('Test Group 2')
    .addUser('Administrator')
    .catch(err => {
      expect(err).toBeUndefined();
    });
  let result = await ad.user('Administrator').isMemberOf('Test Group 2');
  expect(result).toBe(true);
});

test('group(group).removeUser(user) should remove a user', async () => {
  let addResult = await ad
    .group('Test Group 2')
    .removeUser('Administrator')
    .catch(err => {
      expect(err).toBeUndefined();
    });
  let result = await ad.user('Administrator').isMemberOf('Test Group 2');
  expect(result).toBe(false);
});

test('group(group).remove() should remove the group.', async () => {
  try {
    let result = await ad.group('Test Group 1').remove();
    expect(result.success).toBe(true);
    let exists = await ad.group('Test Group 1').exists();
    expect(exists).toBe(false);
    await ad.group('Test Group 2').remove();
  } catch (err) {
    expect(err).not.toBeDefined();
  }
});

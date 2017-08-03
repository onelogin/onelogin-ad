const AD = require('../index.js');
const config = require('./importConfig');

test('throws with no config', () => {
  expect(() => new AD()).toThrow('Configuration is required.');
});

const url = config.url;
const user = config.user;
const pass = config.pass;

test('throws on missing url', () => {
  expect(() => new AD({ user, pass })).toThrow(
    'The following configuration is required: {url, user, pass}.'
  );
});

test('throws on incomplete url', () => {
  expect(() => new AD({ url: '127.0.0.1', user, pass })).toThrow(
    'You must specify the protocol in the url, such as ldaps://127.0.0.1.'
  );
});

test('throws on missing user', () => {
  expect(() => new AD({ url, pass })).toThrow(
    'The following configuration is required: {url, user, pass}.'
  );
});

test('throws on incomplete user', () => {
  expect(() => new AD({ url, user: 'mock', pass })).toThrow(
    'The user must include the fully qualified domain name, such as joe@acme.co.'
  );
});

test('throws on missing pass', () => {
  expect(() => new AD({ url, user })).toThrow(
    'The following configuration is required: {url, user, pass}.'
  );
});

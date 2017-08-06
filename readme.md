# AD

> Making Active Directory jQuery-easy.

---

[![Build Passing](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://img.shields.io/badge/build-passing-brightgreen.svg)
[![Build Coverage 100%](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://img.shields.io/badge/build-100%25-brightgreen.svg)


AD is a Javascript implementation of common Active Directory tasks, built to be simple as possible.

Really simple.

You can use `async` / `await`:

```js
(async () => {
	try {

		await ad.user().add({
			userName: 'jsmith'
			firstName: 'John',
			lastName: 'Smith',
			location: '/Users/Sales',
			password: 'J@vascr!pt1'
		});
		await ad.group().add('Sales');
		await ad.user('jsmith').addToGroup('Sales');

	} catch(err) {
		// ...
	}
})();
```

Or stick with promises:

```js
ad.user('agnes').changePassword('d0ntForgetThisTime')\
	.then(() => ad.user('crook').disable())
	.then(() => ad.user('larry').move('Dungeon'))
	.catch((err) => {
		// ...
	});

```

### Features

 - Robust `user`, `group` and `ou` manipulation methods
 - High and low-level search methods
 - Caching by default
 - Fancy result filtering including column and value filtering, sorting and pagination
 - [Companion drop-in REST API](https://github.com/dthree/addict)

## Getting Started

First, install the library:

```bash
npm i ad
```

```bash
yarn add ad
```

Then add this to `index.js`:

```js
const AD = require('ad');

// Your AD account should be a member
// of the Administrators group.
const ad = new AD({
	url: "ldaps://127.0.0.1",
	user: "dthree@acme.co",
	pass: "howinsecure"
});

ad.user().get().then(users => {
	console.log('Your users:', users);
}).catch(err => {
	console.log('Error getting users:', err);
});

```

Now run the file:

```bash
node index.js
```

And you're off to the races.

## API

```js
ad.user().get(filter)
ad.user().add(options)
ad.user(username).get(filter)
ad.user(userName).exists()
ad.user(userName).addToGroup(groupName)
ad.user(userName).removeFromGroup(groupName)
ad.user(userName).isMemberOf(groupName)
ad.user(userName).authenticate(password)
ad.user(userName).password(password)
ad.user(userName).passwordNeverExpires()
ad.user(userName).passwordExpires()
ad.user(userName).enable()
ad.user(userName).disable()
ad.user(userName).move(location)
ad.user(userName).unlock()
ad.user(userName).remove()
ad.user(userName).location()

ad.group().get(filter)
ad.group().add(options)
ad.group(groupName).get(filter)
ad.group(groupName).exists()
ad.group(groupName).addUser(userName)
ad.group(groupName).removeUser(userName)
ad.group(groupName).remove()

ad.ou().get(filter)
ad.ou().add(options)
ad.ou(ouName).get()
ad.ou(ouName).exists()
ad.ou(ouName).remove()

ad.other().get(filter)
ad.all().get(filter)
ad.find(searchString)

ad.cache(boolean)
ad.cacheTimeout(millis)
```

### User Methods

#### ad.user().get(filter)

Returns all user objects.

```js
await ad.user().get({fields: 'sAMAccountName'});
// => ['jsmith', 'dthree', 'qix'];

```

#### ad.user().add(options)

Creates a new user. Returns the created user object.

##### Options:

* `userName`: String (required)
* `pass`: String (required)
* `commonName`: String (required)
* `firstName`: String
* `lastName`: String
* `email`: String
* `title`: String
* `location`: String

If not specified, the first and last name will be based on the `commonName`.

```js
await ad.user().add({
	userName: 'jsmith'
	commonName: 'John Smith',
	password: 'J@vascr!pt1'
});
// => {sAMAccountName: 'jsmith' ... }

```

#### ad.user(userName).get(filter)

Returns a user object. If no user is matched, returns `undefined`.

```js
await ad.user('jsmith').get();
// => {sAMAccountName: 'jsmith', email: 'jsmith@acme.co' ... }

```

#### ad.user(userName).exists()

Returns a `Boolean` of whether the user account matched.

```js
await ad.user('lochness').exists();
// => false

```

#### ad.user(userName).addToGroup(groupName)

Adds a user to a security group.

```js
await ad.user('jsmith').addToGroup('Sales');
// => {success: true}

```

#### ad.user(userName).removeFromGroup(groupName)

Removes a user from a security group.

```js
await ad.user('jsmith').removeFromGroup('Sales');
// => {success: true}

```

#### ad.user(userName).isMemberOf(groupName)

Returns a `Boolean` based on whether the user is a member of a group.

```js
await ad.user('jsmith').isMemberOf('Sales');
// => true

```

#### ad.user(userName).authenticate(password)

Attempts to authenticate a user with a given password. Returns `Boolean`.

```js
await ad.user('jsmith').authenticate('J@vascript1#!');
// => true

```

#### ad.user(userName).password(password)

Sets a user's password.

```js
await ad.user('jsmith').password('Wh-m@ksp@ssw-rdslIkethis');
// => true

```

#### ad.user(userName).passwordNeverExpires()

Sets a user's to never expire.

```js
await ad.user('jsmith').passwordNeverExpires();
// => {success: true}

```

#### ad.user(userName).passwordExpires()

Unchecks the "Password never expires" box.

```js
await ad.user('jsmith').passwordExpires();
// => {success: true}

```

#### ad.user(userName).enable()

Enables a user.

```js
await ad.user('jsmith').enable();
// => {success: true}

```

#### ad.user(userName).disable()

Disables a user.

```js
await ad.user('jsmith').disable();
// => {success: true}

```

#### ad.user(userName).unlock()

Unlocks a user who has been locked out by repeated failed login attempts.

```js
await ad.user('jsmith').unlock();
// => {success: true}

```

#### ad.user(userName).lock()

Just kidding. You can't lock an account. Try disabling it instead.

```js
await ad.user('jsmith').disable();
// => {success: true}

```

#### ad.user(userName).move(location)

Moves a user to another directory, starting from the root of the domain.

```js
await ad.user('jsmith').move('Users/HR');
// => {success: true}

```
This is the equivalent of `acme.co => Users (OU) => HR (OU)`. The new `Distinguished Name` (DN) would become `CN=John Smith,OU=HR,OU=Users,DC=acme,DC=co`.

To specify a folder that is not an Organizational Unit, prefix it with `!`:

```js
await ad.user('admin').move('!Builtin');
// => {success: true}

```

#### ad.user(userName).location()

Returns a user's relative location, separated by `/`es.

```js
await ad.user('jsmith').location();
// => 'Users/HR'

```

#### ad.user(userName).remove()

Deletes a user. Are you sure you want to do this?

```js
await ad.user('jsmith').remove();
// => {success: true}

```


### Group Methods

#### ad.group().get(filter)

Returns all group objects.

```js
await ad.group().get();
// => [{ ... }, { ... }];

```

#### ad.group().add(options)

Creates a new group. Returns the created group object.

##### Options:

* `name`: String (required)
* `location`: String
* `description`: String

```js
await ad.group().add({
	name: 'HR'
	location: '!Builtin',
	description: 'Human Resources users.'
});
// => {sAMAccountName: 'HR' ... }

```

#### ad.group(groupName).get(filter)

Returns a group object. If no group is matched, returns `undefined`.

```js
await ad.group('HR').get();
// => {sAMAccountName: 'HR', description: 'Human...' ... }

```

#### ad.group(groupName).exists()

Returns a `Boolean` of whether the group account matched.

```js
await ad.group('Beastie Boys').exists();
// => false

```

#### ad.group(groupName).addUser(groupName)

Adds a user to a group.

```js
await ad.group('HR').addUser('bjones');
// => {success: true}

```

#### ad.group(groupName).removeUser(groupName)

Removes a user from a group.

```js
await ad.group('HR').removeUser('bjones');
// => {success: true}

```

#### ad.group(groupName).remove()

Deletes a group.

```js
await ad.group('HR').remove();
// => {success: true}

```


### Organizational Unit (OU) Methods

#### ad.ou().get(filter)

Returns all ou objects.

```js
await ad.ou().get();
// => [{ ... }, { ... }];

```

#### ad.ou().add(options)

Creates a new Organizational Unit. Returns the created OU object.

##### Options:

* `name`: String (required)
* `location`: String
* `description`: String

```js
await ad.ou().add({
	name: 'Sales'
	location: 'Users'
	description: 'Sales Users.'
});
// => {ou: 'Sales' ... }

```

#### ad.ou(ouName).get(filter)

Returns an OU object. If no OU is matched, returns `undefined`.

```js
await ad.ou('Sales').get();
// => {ou: 'Sales', description: 'Sales...' ... }

```

#### ad.ou(ouName).exists()

Returns a `Boolean` of whether the OU exists.

```js
await ad.ou('Sales').exists();
// => true

```

#### ad.user(userName).remove()

Deletes an Organizational Unit. As a note, if it has any children, this will not work.

```js
await ad.ou('Sales').remove();
// => {success: true}

```


### Other methods

#### ad.other().get(filter)

Returns all objects that are not users or groups.

```js
await ad.other().get();
// => [{ ... }, { ... }];

```

#### ad.all().get(filter)

Returns all objects in the Active Directory instance, grouping by `users`, `groups` and `other`.

```js
await ad.other().get();
// => [users: [...], groups: [...], other: [...]];

```

#### ad.find(searchString)

Returns a raw search of the entire Active Directory.

```js
await ad.search('CN=Da*');
// => [{...}, {...}];

```


### Caching

#### ad.cache(boolean)

Enables or disables caching. Defaults to `true`.

```js
ad.cache(false);
```

#### ad.cacheTimeout(millis)

Sets the amount of milliseconds before a cached item expires. Defaults to ten minutes. Chainable to `ad.cache`.

```js
ad.cache(true).cacheTimeout(60000);
```


## Why?

Active Directory / LDAP can be hard. Some of us are stuck with it.

Should you really have to know that `cn` stands for `Common Name` (or was it `Canonical`) in order to use it? Or that `sn` is a `surname`*? I dislike systems that require detailed knowledge of their dirty laundry to do anything with them.

So this was a selfish project, really.

Made with <3 by [dthree](https://github.com/dthree).

_*last name_

## License

MIT

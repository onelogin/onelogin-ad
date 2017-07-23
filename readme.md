# AD

> Making Active Directory jQuery-easy.

[]

---

AD is a Javascript implementation of common Active Directory tasks, built to be simple as possible.

Really simple. jQuery-simple ([it doesn't do addition though](http://4.bp.blogspot.com/-Hk1mt-RKYLc/UOkxShm6NrI/AAAAAAAACqo/LVmqHOfWV7g/s1600/20091116-so-large.gif)).

You can use `async` / `await`:

```
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

```
	ad.user('agnes').changePassword('d0ntForgetThisTime')\
		.then(() => ad.user('crook').disable())
		.then(() => ad.user('larry').move('Dungeon'))
		.catch((err) => {
			// ...
		});

```

## Getting Started

First, install the library:

```
npm i ad
```

```
yarn add ad
```

Then add this to `index.js`:

```
const AD = require('ad');

const ad = new ad({
	url: "ldaps://127.0.0.1",
	user: "dthree@acme.co",
	pass: "howinsecure"
});

```

And you're off to the races.

## API

```
ad.user().get(opts)
ad.user().add(opts)
ad.user(username).get(opts)
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

ad.group().get(opts)
ad.group().add()
ad.group(groupName).get(opts)
ad.group(groupName).exists()
ad.group(groupName).addUser(userName)
ad.group(groupName).removeUser(userName)
ad.group(groupName).remove()

ad.ou().get(opts)
ad.ou().add(opts)
ad.ou(ouName).get()
ad.ou(ouName).exists()
ad.ou(ouName).remove()

ad.other().get(opts)
ad.all().get(opts)
ad.find(searchString)
```

## Why?

Active Directory / LDAP can be hard. Some of us are stuck with it, so I wanted to make it easier.


## License

MIT
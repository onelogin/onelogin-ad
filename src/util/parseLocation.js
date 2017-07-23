module.exports = function parseLocation(location) {
	if (location) {
		location = String(location)
			.replace(/\\/g, '/')
			.split('/')
			.reverse()
			.map(loc => {
				return (loc.slice(0, 1) === '!') 
					? loc.replace('!', 'CN=') 
					: `OU=${loc}`;
			})
			.join(',');
		location += ',';
	}
	location = location || '';
	return location;
}

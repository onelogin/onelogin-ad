const fs = require('fs');

let config;
try {
	config = require('./config.vendor.json');
} catch(e) {
	/* istanbul ignore next */
	config = require('./config.json');
}

module.exports = config;
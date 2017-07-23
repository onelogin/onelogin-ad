const orderBy = require('lodash.orderby');

module.exports.processResults = (config, rows) => {
	if (!config) {
		return rows;
	}

	if (!Array.isArray(rows)) {
		for (const key in rows) {
			if (Array.isArray(rows[key])) {
				rows[key] = module.exports.processResults(config, rows[key]);
			}
		}
		return rows;
	}

	const {
		fields,
		filter,
		q,
		start,
		end,
		limit,
		page,
		sort,
		order
	} = config;

	if (filter) {
		for (const key in filter) {
			const keyParts = String(key).split('_');
			const string = keyParts[0];
			const operator = keyParts[1];
			function prep(val) {
				return (!isNaN(val)) ? parseFloat(val) : String(val).toLowerCase();
			}
			const value = prep(filter[key]);
			if (operator === 'gte') {
				rows = rows.filter(row => prep(row[string]) >= value);
			} else if (operator === 'lte') {
				rows = rows.filter(row => prep(row[string]) <= value);
			} else if (operator === 'gt') {
				rows = rows.filter(row => prep(row[string]) > value);
			} else if (operator === 'lt') {
				rows = rows.filter(row => prep(row[string]) < value);
			} else if (operator === 'ne') {
				rows = rows.filter(row => prep(row[string]) !== value);
			} else if (operator === 'like') {
				rows = rows.filter(row => prep(row[string]).indexOf(value) > -1);
			} else {
				rows = rows.filter(row => prep(row[string]) === value);
			}
		}
	}

	if (q) {
		const str = String(q).toLowerCase();
		rows = rows.filter(row => {
			let match = false;
			for (const item in row) {
				if (String(row[item]).toLowerCase().indexOf(str) > -1) {
					match = true;
				}
			}
			return match;
		});
	}

	if (fields) {
		rows = rows.map(row => {
			let out = {};
			fields.forEach(f => {
				out[f] = row[f];
			});
			return out;
		});
	}

	if (start && !limit) {
		rows = rows.slice(start - 1, end);
	} else if (end) {
		rows = rows.slice(0, end);
	} else if (page) {
		const l = parseFloat(limit || 10);
		let s = parseFloat(l * (page - 1));
		s = s < 0 ? 0 : s;
		rows = rows.slice(s, s + l);
	} else if (limit) {
		let begin = ((start || 1) - 1);
		rows = rows.slice(begin, begin + limit);
	}

	if (sort) {
		rows = orderBy(rows, sort, order.map(o => String(o).toLowerCase()));
	}

	rows = rows.map(n => {
		for (const key in n) {
			if (n[key] === undefined) {
				delete n[key];
			}
		}
		return n;
	}).filter(n => {
		return Object.keys(n).length > 0;
	});

	return rows;
}

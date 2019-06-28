const connection = require("../db/connection");

const checkExists = (value, table, column) => {
	return connection
		.select("*")
		.from(table)
		.where(column, value)
		.then(rows => {
			if (rows.length === 0) {
				return false;
			}
			return true;
		});
};

const checkInteger = value => {
	const numRegex = /\D/g;
	if (value === numRegex) return true;
	else return false;
};

module.exports = { checkExists, checkInteger };

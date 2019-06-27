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

module.exports = { checkExists };

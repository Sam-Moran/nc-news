exports.up = function(connection, Promise) {
	return connection.schema.createTable("topics", topicsTable => {
		topicsTable.string("description").notNullable();
		topicsTable
			.string("slug")
			.notNullable()
			.primary();
	});
};
exports.down = function(connection, Promise) {
	return connection.schema.dropTable("topics");
};

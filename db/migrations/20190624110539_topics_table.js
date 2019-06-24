exports.up = function(connection, Promise) {
	return connection.schema.createTable("topics", topicsTable => {
		topicsTable.string("description", 40).notNullable();
		topicsTable
			.string("slug", 20)
			.notNullable()
			.primary();
	});
};
exports.down = function(connection, Promise) {
	return connection.schema.dropTable("topics");
};

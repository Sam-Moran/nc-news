exports.up = function(connection, Promise) {
	return connection.schema.createTable("users", usersTable => {
		usersTable
			.string("username", 40)
			.notNullable()
			.primary();
		usersTable.string("avatar_url").notNullable();
		usersTable.string("name", 20).notNullable();
	});
};

exports.down = function(connection, Promise) {
	return connection.schema.dropTable("users");
};

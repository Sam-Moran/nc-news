exports.up = function(connection, Promise) {
	return connection.schema.createTable("users", usersTable => {
		usersTable
			.string("username", 40)
			.notNullable()
			.primary()
			.unique();
		usersTable.string("avatar_url");
		usersTable.string("name", 20).notNullable();
	});
};

exports.down = function(connection, Promise) {
	return connection.schema.dropTable("users");
};

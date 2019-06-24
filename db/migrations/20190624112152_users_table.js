exports.up = function(connection, Promise) {
	return connection.schema.createTable("users", usersTable => {
		usersTable
			.string("username")
			.notNullable()
			.primary()
			.unique();
		usersTable.string("avatar_url");
		usersTable.string("name").notNullable();
	});
};

exports.down = function(connection, Promise) {
	return connection.schema.dropTable("users");
};

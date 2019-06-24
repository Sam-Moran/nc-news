exports.up = function(connection, Promise) {
	return connection.schema.createTable("articles", articlesTable => {
		articlesTable.increments("article_id").primary();
		articlesTable.string("title", 20).notNullable();
		articlesTable.text("body").notNullable();
		articlesTable.integer("votes").defaultTo(0);
		articlesTable.string("topic").references("topics.slug");
		articlesTable.string("author").references("users.username");
	});
};

exports.down = function(connection, Promise) {
	return connection.schema.dropTable("articles");
};

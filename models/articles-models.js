const connection = require("../db/connection");

const fetchArticleById = article_id => {
	return connection("articles")
		.first("articles.*")
		.join("comments", "comments.article_id", "=", " articles.article_id")
		.count("comments.article_id as comment_count")
		.groupBy("articles.article_id", "comments.article_id")
		.where("articles.article_id", article_id)
		.then(article => {
			if (!article) {
				return Promise.reject({
					status: 404,
					msg: `Article ${article_id} does not exist!`
				});
			} else return article;
		});
};

const updateArticleById = (article_id, inc_votes) => {
	return connection
		.into("articles")
		.where("article_id", "=", article_id)
		.increment("votes", inc_votes)
		.returning("*")
		.then(([article]) => article);
};

const addComment = formattedComment => {
	return connection
		.into("comments")
		.insert(formattedComment)
		.returning("*")
		.then(([comment]) => comment);
};

module.exports = { fetchArticleById, updateArticleById, addComment };

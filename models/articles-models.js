const connection = require("../db/connection");

const fetchArticleById = (article_id, comments) => {
	return connection("articles")
		.first("articles.*")
		.leftJoin("comments", "comments.article_id", "=", " articles.article_id")
		.count("comments.article_id as comment_count")
		.groupBy("articles.article_id", "comments.article_id")
		.where("articles.article_id", article_id)
		.returning("*")
		.then(article => {
			if (!article) {
				return Promise.reject({
					status: 404,
					msg: `Article ${article_id} does not exist!`
				});
			} else if (article & comments) {
				let article = [];
				return article;
			} else return article;
		});
};

const updateArticleById = (article_id, inc_votes) => {
	if (inc_votes) {
		return connection
			.into("articles")
			.where("article_id", "=", article_id)
			.increment("votes", inc_votes)
			.returning("*")
			.then(([article]) => article);
	} else
		return Promise.reject({
			status: 400,
			msg: `Must use "inc_votes: n" format when updating votes`
		});
};

const addComment = formattedComment => {
	return connection
		.into("comments")
		.insert(formattedComment)
		.returning("*")
		.then(([comment]) => comment);
};

const fetchComments = (article_id, { sort_by, order }) => {
	const acceptedOrders = ["asc", "desc", undefined];
	if (acceptedOrders.includes(order)) {
		return connection
			.select(
				"comments.comment_id",
				"comments.author",
				"comments.votes",
				"comments.created_at",
				"comments.body"
			)
			.from("comments")
			.where("comments.article_id", "=", article_id)
			.orderBy(sort_by || "created_at", order || "desc")
			.returning("*")
			.then(comments => {
				if (!comments.length) {
					return fetchArticleById(article_id, comments);
				} else return comments;
			});
	} else
		return Promise.reject({
			status: 400,
			msg: `Cannot order columns by ${order}, must use "asc" or "desc"`
		});
};

const fetchArticles = () => {
	return connection
		.select("*")
		.from("articles")
		.rightJoin("comments", "comments.article_id", "=", " articles.article_id")
		.count("comments.article_id as comment_count")
		.groupBy("articles.article_id", "comments.article_id")
		.returning("*")
		.then(articles => console.log(articles));
};

module.exports = {
	fetchArticleById,
	updateArticleById,
	addComment,
	fetchComments,
	fetchArticles
};

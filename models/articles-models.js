const connection = require("../db/connection");
const { checkExists } = require("./index.js");

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
			} else return article;
		});
};

const updateArticleById = (article_id, body) => {
	const { inc_votes } = body;
	if (inc_votes || Object.keys(body).length == 0) {
		return connection
			.into("articles")
			.where("article_id", "=", article_id)
			.increment("votes", inc_votes || 0)
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
				const articleExists = article_id
					? checkExists(article_id, "articles", "article_id")
					: null;
				return Promise.all([articleExists, comments]);
			})
			.then(([articleExists, comments]) => {
				if (articleExists === false)
					return Promise.reject({
						status: 404,
						msg: `Article ${article_id} does not exist!`
					});
				else return comments;
			});
	} else
		return Promise.reject({
			status: 400,
			msg: `Cannot order columns by ${order}, must use "asc" or "desc"`
		});
};

const fetchArticles = ({ sort_by, order, author, topic }) => {
	const acceptedOrders = ["asc", "desc", undefined];
	if (acceptedOrders.includes(order)) {
		return connection
			.select("articles.*")
			.from("articles")
			.leftJoin("comments", "comments.article_id", "=", " articles.article_id")
			.count("comments.article_id as comment_count")
			.groupBy("articles.article_id", "comments.article_id")
			.orderBy(sort_by || "created_at", order || "desc")
			.returning("*")
			.modify(query => {
				if (author) {
					query.where("articles.author", "=", author);
				} else if (topic) {
					query.where("articles.topic", "=", topic);
				}
			})
			.then(articles => {
				const authorExists = author
					? checkExists(author, "users", "username")
					: null;
				const topicExists = topic ? checkExists(topic, "topics", "slug") : null;
				return Promise.all([authorExists, topicExists, articles]);
			})
			.then(([authorExists, topicExists, articles]) => {
				if (authorExists === false) {
					return Promise.reject({
						status: 404,
						msg: `Author ${author} does not exist!`
					});
				} else if (topicExists === false) {
					return Promise.reject({
						status: 404,
						msg: `Topic ${topic} does not exist!`
					});
				} else return articles;
			});
		om;
	} else
		return Promise.reject({
			status: 400,
			msg: `Cannot order columns by ${order}, must use "asc" or "desc"`
		});
};

module.exports = {
	fetchArticleById,
	updateArticleById,
	addComment,
	fetchComments,
	fetchArticles
};

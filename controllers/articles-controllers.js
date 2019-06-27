const {
	fetchArticleById,
	updateArticleById,
	addComment,
	fetchComments,
	fetchArticles
} = require("../models/articles-models.js");
const { checkExists } = require("../models/index.js");

const sendArticleById = (req, res, next) => {
	const { article_id } = req.params;
	fetchArticleById(article_id)
		.then(article => {
			res.status(200).send({ article });
		})
		.catch(err => next(err));
};

const patchArticleById = (req, res, next) => {
	const { article_id } = req.params;
	const { body } = req;
	updateArticleById(article_id, body)
		.then(article => {
			res.status(200).send({ article });
		})
		.catch(err => next(err));
};
const postComment = (req, res, next) => {
	const { body } = req;
	const { article_id } = req.params;
	const formattedComment = {
		author: body.username,
		body: body.body,
		article_id
	};

	addComment(formattedComment, article_id)
		.then(comment => {
			if (!formattedComment.author) {
				res.status(400).send({ msg: "Comment must have a username" });
			} else {
				res.status(201).send({ comment });
			}
		})
		.catch(err => next(err));
};

const getComments = (req, res, next) => {
	const { article_id } = req.params;
	fetchComments(article_id, req.query)
		.then(comments => {
			if (comments.topic) {
				const emptyArray = { comments: [] };
				res.status(200).send(emptyArray);
			} else {
				res.status(200).send({ comments });
			}
		})
		.catch(err => next(err));
};

const getArticles = (req, res, next) => {
	fetchArticles(req.query)
		.then(articles => {
			if (!articles) {
				res.status(400).send([]);
			} else res.status(200).send({ articles });
		})
		.catch(err => next(err));
};

module.exports = {
	sendArticleById,
	patchArticleById,
	postComment,
	getComments,
	getArticles
};

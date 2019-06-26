const {
	fetchArticleById,
	updateArticleById,
	addComment,
	fetchComments
} = require("../models/articles-models.js");

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
	const { inc_votes } = req.body;
	updateArticleById(article_id, inc_votes)
		.then(article => {
			res.status(201).send({ article });
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
	addComment(formattedComment)
		.then(comment => {
			res.status(201).send({ comment });
		})
		.catch(err => next(err));
};

const getComments = (req, res, next) => {
	const { article_id } = req.params;
	fetchComments(article_id, req.query)
		.then(comments => {
			res.status(200).send(comments);
		})
		.catch(err => next(err));
};

module.exports = {
	sendArticleById,
	patchArticleById,
	postComment,
	getComments
};

const articlesRouter = require("express").Router();
const {
	sendArticleById,
	patchArticleById,
	postComment,
	getComments,
	getArticles
} = require("../controllers/articles-controllers");
const { methodNotAllowed } = require("../errors/errorhandling.js");

articlesRouter
	.route("/:article_id")
	.get(sendArticleById)
	.patch(patchArticleById)
	.all(methodNotAllowed);

articlesRouter
	.route("/:article_id/comments")
	.post(postComment)
	.get(getComments)
	.all(methodNotAllowed);

articlesRouter
	.route("/")
	.get(getArticles)
	.all(methodNotAllowed);

module.exports = { articlesRouter };

const articlesRouter = require("express").Router();
const {
	sendArticleById,
	patchArticleById
} = require("../controllers/articles-controllers");
const { methodNotAllowed } = require("../errors/errorhandling.js");

articlesRouter
	.route("/:article_id")
	.get(sendArticleById)
	.patch(patchArticleById)
	.all(methodNotAllowed);

module.exports = { articlesRouter };

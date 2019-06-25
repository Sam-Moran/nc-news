const articlesRouter = require("express").Router();
const { sendArticleById } = require("../controllers/articles-controllers");

articlesRouter.route("/:article_id").get(sendArticleById);

module.exports = { articlesRouter };

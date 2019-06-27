const commentsRouter = require("express").Router();
const {
	updateCommentById,
	removeCommentById
} = require("../controllers/comments-controllers");
const { methodNotAllowed } = require("../errors/errorhandling.js");

commentsRouter
	.route("/:comment_id")
	.patch(updateCommentById)
	.delete(removeCommentById)
	.all(methodNotAllowed);

module.exports = { commentsRouter };

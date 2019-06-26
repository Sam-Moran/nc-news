const usersRouter = require("express").Router();
const { sendUserByUsername } = require("../controllers/users-controllers");
const { methodNotAllowed } = require("../errors/errorhandling.js");

usersRouter
	.route("/:username")
	.get(sendUserByUsername)
	.all(methodNotAllowed);

module.exports = { usersRouter };

const topicsRouter = require("express").Router();
const { sendTopics } = require("../controllers/topics-controllers");
const { methodNotAllowed } = require("../errors/errorhandling.js");

topicsRouter
	.route("/")
	.get(sendTopics)
	.all(methodNotAllowed);

module.exports = { topicsRouter };

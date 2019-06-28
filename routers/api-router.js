const apiRouter = require("express").Router();
const { topicsRouter } = require("./topics-router.js");
const { usersRouter } = require("./users-router.js");
const { articlesRouter } = require("./articles-router");
const { commentsRouter } = require("./comments-router.js");
const { methodNotAllowed } = require("../errors/errorhandling.js");
const { endpoints } = require("../endpoints.json");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter
	.route("/*")
	.all(methodNotAllowed)
	.get((req, res) => {
		res.status(200).send({ endPoints });
	});

module.exports = apiRouter;

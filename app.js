const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");
const {
	customError,
	sqlErrors,
	serverError
} = require("./errors/errorhandling.js");

app.use(express.json());

app.use("/api", apiRouter);
app.all("/*", (req, res, next) =>
	res.status(404).send({ msg: "Route not found" })
);

app.use(customError);
app.use(sqlErrors);
app.use(serverError);

module.exports = app;

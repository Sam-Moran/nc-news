const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");
const {
	customError,
	sqlErrors,
	serverError,
	pageNotFound
} = require("./errors/errorhandling.js");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);
app.use("/*", pageNotFound);
app.use(customError);
app.use(sqlErrors);
app.use(serverError);

module.exports = app;

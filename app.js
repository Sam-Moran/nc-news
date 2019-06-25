const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");

app.use(express.json());

app.use("/api", apiRouter);
app.all("/*", (req, res, next) =>
	res.status(404).send({ msg: "Route not found" })
);

app.use((err, req, res, next) => {
	if (err.status) res.status(err.status).send({ msg: err.msg });
	else next(err);
});
app.use((err, req, res, next) => {
	if (err.code === "22P02") {
		res.status(400).send({ msg: "Bad request" });
	}
	next(err);
});

app.use((err, req, res, next) => {
	res.status(500).send({ msg: "Internal Server Error" });
});
module.exports = app;

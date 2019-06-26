const customError = (err, req, res, next) => {
	if (err.status) res.status(err.status).send({ msg: err.msg });
	else next(err);
};

const sqlErrors = (err, req, res, next) => {
	if (err.code === "22P02") {
		res.status(400).send({ msg: "Bad request" });
	}
	next(err);
};

const serverError = (err, req, res, next) => {
	res.status(500).send({ msg: "Internal Server Error" });
};

const methodNotAllowed = (req, res) => {
	res.status(405).send({ msg: "Method not allowed" });
};

module.exports = { customError, sqlErrors, serverError, methodNotAllowed };

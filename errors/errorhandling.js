const customError = (err, req, res, next) => {
	if (err.status) res.status(err.status).send({ msg: err.msg });
	else next(err);
};

const sqlErrors = (err, req, res, next) => {
	const errorCodes = {
		"22P02": "Bad request",
		"23502": "Cannot insert null data",
		"23503": `${err.detail}`
	};
	if (errorCodes[err.code]) {
		res.status(400).send({ msg: errorCodes[err.code] });
	}
	next(err);
};

const serverError = (err, req, res, next) => {
	res.status(500).send({ msg: "Internal Server Error" });
};

const methodNotAllowed = (req, res) => {
	res.status(405).send({ msg: "Method not allowed" });
};

const pageNotFound = (req, res, next) =>
	res.status(404).send({ msg: "Route not found" });

module.exports = {
	customError,
	sqlErrors,
	serverError,
	methodNotAllowed,
	pageNotFound
};

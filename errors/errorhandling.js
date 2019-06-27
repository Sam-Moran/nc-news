const customError = (err, req, res, next) => {
	if (err.status) res.status(err.status).send({ msg: err.msg });
	else next(err);
};

const sqlErrors = (err, req, res, next) => {
	const errorCodes = {
		"22P02": "Bad request",
		"23502": "Cannot insert null data",
		"23503": "Resource does not exist",
		"42703": "Column to sort_by does not exist",
		"22003": "Article_id value is not within range"
	};
	if (err.code === "23503") {
		res.status(404).send({ msg: errorCodes[err.code] });
	} else if (errorCodes[err.code]) {
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

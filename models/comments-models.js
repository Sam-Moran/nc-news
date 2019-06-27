const connection = require("../db/connection");

const patchCommentById = (comment_id, inc_votes) => {
	if (inc_votes) {
		return connection
			.into("comments")
			.where("comment_id", "=", comment_id)
			.increment("votes", inc_votes)
			.returning("*")
			.then(([comment]) => comment);
	} else
		return Promise.reject({
			status: 400,
			msg: `Must use "inc_votes: n" format when updating votes`
		});
};

const deleteCommentById = comment_id => {
	return connection
		.into("comments")
		.where("comment_id", "=", comment_id)
		.del();
};

module.exports = { patchCommentById, deleteCommentById };

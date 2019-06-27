const connection = require("../db/connection");
const { checkExists } = require("./index.js");

const patchCommentById = (comment_id, body) => {
	const { inc_votes } = body;
	if (inc_votes || Object.keys(body).length == 0) {
		return connection
			.into("comments")
			.where("comment_id", "=", comment_id)
			.increment("votes", inc_votes || 0)
			.returning("*")
			.then(([comments]) => {
				const commentExists = comment_id
					? checkExists(comment_id, "comments", "comment_id")
					: null;
				return Promise.all([commentExists, comments]);
			})
			.then(([commentExists, comments]) => {
				if (commentExists === false)
					return Promise.reject({
						status: 404,
						msg: `Comment ${comment_id} does not exist!`
					});
				else return comments;
			});
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

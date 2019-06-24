const {
	topicData,
	articleData,
	commentData,
	userData
} = require("../index.js");

const { formatDate, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(connection, Promise) {
	return connection.migrate
		.rollback()
		.then(() => connection.migrate.latest())
		.then(() => {
			const topicsInsertions = connection("topics").insert(topicData);
			const usersInsertions = connection("users").insert(userData);
			return Promise.all([topicsInsertions, usersInsertions])
				.then(() => {
					const newArticles = formatDate(articleData);
					return connection
						.insert(newArticles)
						.into("articles")
						.returning("*");
				})
				.then(articleRows => {
					const articleRef = makeRefObj(articleRows);
					const formattedComments = formatComments(commentData, articleRef);
					return connection("comments").insert(formattedComments);
				});
		});
};

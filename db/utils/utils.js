exports.formatDate = list => {
	return list.map(object => {
		object.created_at = new Date(object.created_at);
		return object;
	});
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};

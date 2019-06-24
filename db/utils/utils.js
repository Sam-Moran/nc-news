exports.formatDate = list => {
	return list.map(object => {
		object.created_at = new Date(object.created_at);
		return object;
	});
};

exports.makeRefObj = list => {
	if (list.length === 0) return {};
};

exports.formatComments = (comments, articleRef) => {};

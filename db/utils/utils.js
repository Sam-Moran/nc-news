exports.formatDate = list => {
	if (list.length === 0) return [];
	let currentDate = new Date(list[0].created_at);
	return [currentDate.toDateString()];
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};

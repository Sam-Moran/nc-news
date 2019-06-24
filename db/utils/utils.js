exports.formatDate = list => {
	if (list.length === 0) return [];
	let created_at = new Date(list[0].time);
	return [{ created_at }];
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};

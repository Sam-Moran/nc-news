exports.formatDate = list => {
	return list.map(object => {
		object.created_at = new Date(object.created_at);
		return object;
	});
};

exports.makeRefObj = list => {
	const refObj = {};
	list.forEach(item => {
		refObj[item.title] = item.article_id;
	});
	return refObj;
};

exports.formatComments = (comments, articleRef) => {
	if (comments.length === 0 || !articleRef) return [];
};

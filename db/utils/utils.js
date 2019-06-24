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
	return comments.map(comment => {
		if (comment.length === 0 || !articleRef) return [];
		else {
			comment.author = comment.created_by;
			delete comment.created_by;
			return comment;
		}
	});
};

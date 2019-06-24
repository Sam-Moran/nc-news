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
		comment.author = comment.created_by;
		delete comment.created_by;
		const belong = comment.belongs_to;
		comment.article_id = articleRef[belong];
		delete comment.belongs_to;
		comment.created_at = new Date(comment.created_at);
		return comment;
	});
};

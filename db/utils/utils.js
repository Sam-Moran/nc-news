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
		const {belongs_to, created_by, created_at, ...restOfComment} = comment
		const data = {...restOfComment}
		data.article_id = articleRef[belongs_to];
		data.author = created_by
		data.created_at = new Date(created_at)
		return data;
	});
};

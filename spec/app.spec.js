process.env.NODE_ENV = "test";
const app = require("../app.js");
const request = require("supertest");
const chai = require("chai");
const chaiSorted = require("chai-sorted");
const { expect } = chai;
const connection = require("../db/connection");
chai.use(chaiSorted);

describe("/", () => {
	after(() => connection.destroy());
	beforeEach(() => connection.seed.run());
	describe("/api", () => {
		describe("/topics", () => {
			it("GET status:200 and returns all the topics", () => {
				return request(app)
					.get("/api/topics")
					.expect(200)
					.then(res => {
						expect(res.body.topics[0]).to.contain.keys("description", "slug");
						expect(res.body.topics[0].slug).to.equal("mitch");
					});
			});
			it("PUT status: 405 if using an invalid method", () => {
				return request(app)
					.put("/api/topics")
					.expect(405)
					.then(({ body }) => {
						expect(body.msg).to.equal("Method not allowed");
					});
			});
		});
		describe("/users", () => {
			describe("/:username", () => {
				it("GET status 200: and returns a specifc user object", () => {
					return request(app)
						.get("/api/users/butter_bridge")
						.expect(200)
						.then(res => {
							expect(res.body.user).to.contain.keys(
								"username",
								"avatar_url",
								"name"
							);
							expect(res.body.user.username).to.equal("butter_bridge");
							expect(res.body.user.name).to.equal("jonny");
						});
				});
				it('GET status:404 and returns "User...does not exist!"', () => {
					return request(app)
						.get("/api/users/angryhippo")
						.expect(404)
						.then(error => {
							expect(error.body.msg).to.equal(
								"User angryhippo does not exist!"
							);
						});
				});
				it("PUT status: 405 if using an invalid method", () => {
					return request(app)
						.put("/api/users/angryhippo")
						.expect(405)
						.then(({ body }) => {
							expect(body.msg).to.equal("Method not allowed");
						});
				});
			});
		});

		describe("/articles", () => {
			describe("/:article_id", () => {
				it("GET Status:200 and returns an object of the specific article", () => {
					return request(app)
						.get("/api/articles/1")
						.expect(200)
						.then(res => {
							expect(res.body.article).to.contain.keys(
								"title",
								"article_id",
								"body",
								"topic",
								"created_at",
								"votes"
							);
						});
				});
				it("GET Status:200 returns an object with a comment count", () => {
					return request(app)
						.get("/api/articles/1")
						.expect(200)
						.then(res => {
							expect(res.body.article.comment_count).to.equal("13");
						});
				});
				it('GET status 404 with a valid number but returns "Article...does not exist!"', () => {
					return request(app)
						.get("/api/articles/999")
						.expect(404)
						.then(error => {
							expect(error.body.msg).to.equal("Article 999 does not exist!");
						});
				});
				it("GET status 400, bad request with not a number", () => {
					return request(app)
						.get("/api/articles/one")
						.expect(400)
						.then(error => {
							expect(error.body.msg).to.equal("Bad request");
						});
				});
				it("Patch status:201 and increases the vote count", () => {
					return request(app)
						.patch("/api/articles/1")
						.send({ inc_votes: 1 })
						.expect(201)
						.then(res => {
							expect(res.body.article.votes).to.equal(101);
							expect(res.body.article.votes).to.not.equal(100);
						});
				});
				it("Patch status:201 and decreases the vote count", () => {
					return request(app)
						.patch("/api/articles/1")
						.send({ inc_votes: -1 })
						.expect(201)
						.then(res => {
							expect(res.body.article.votes).to.equal(99);
							expect(res.body.article.votes).to.not.equal(100);
						});
				});
				it("PATCH status: 400 returns Bad Request when trying to change votes by not a number ", () => {
					return request(app)
						.patch("/api/articles/1")
						.send({ inc_votes: "b" })
						.expect(400)
						.then(({ body }) => {
							expect(body.msg).to.equal("Bad request");
						});
				});
				it("PATCH Status: 400 and returns error message when passed an invalid body", () => {
					return request(app)
						.patch("/api/articles/1")
						.send({ increased_the_votes: 1 })
						.expect(400)
						.then(({ body }) => {
							expect(body.msg).to.equal(
								'Must use "inc_votes: n" format when updating votes'
							);
						});
				});
				it("PUT status: 405 if using an invalid method", () => {
					return request(app)
						.put("/api/articles/1")
						.expect(405)
						.then(({ body }) => {
							expect(body.msg).to.equal("Method not allowed");
						});
				});
				it("GET Status: 400 and returns error message if passed a number that is not within range", () => {
					return request(app)
						.get("/api/articles/1111111111111111111111111111")
						.expect(400)
						.then(({ body }) => {
							expect(body.msg).to.equal("Article_id value is not within range");
						});
				});
				it("GET Status: 400 and returns an error message if invoking with special characters", () => {
					return request(app)
						.get("/api/articles/@@@@@@@@@@@@")
						.expect(400)
						.then(({ body }) => {
							expect(body.msg).to.equal("Bad request");
						});
				});
				describe("/comments", () => {
					it("PUT status: 405 if using an invalid method", () => {
						return request(app)
							.put("/api/articles/1/comments")
							.expect(405)
							.then(({ body }) => {
								expect(body.msg).to.equal("Method not allowed");
							});
					});
					it("POST status:201 insert a comment to a valid article id and return the comment", () => {
						return request(app)
							.post("/api/articles/1/comments")
							.send({
								username: "butter_bridge",
								body:
									"This is not the greatest comment in the world, this is just a tribute."
							})
							.expect(201)
							.then(({ body }) => {
								expect(body.comment).to.contain.keys(
									"comment_id",
									"author",
									"article_id",
									"votes",
									"created_at",
									"body"
								);
								expect(body.comment.body).to.equal(
									"This is not the greatest comment in the world, this is just a tribute."
								);
								expect(body.comment.article_id).to.equal(1);
							});
					});
					it("POST status:400, error when trying to insert a comment into an invalid article_id", () => {
						return request(app)
							.post("/api/articles/99/comments")
							.send({
								username: "butter_bridge",
								body:
									"This is not the greatest comment in the world, this is just a tribute."
							})
							.expect(400)
							.then(({ body }) => {
								expect(body.msg).to.equal("Resource does not exist");
							});
					});
					it("POST Status:400, error when trying to insert empty comment object into a valid article", () => {
						return request(app)
							.post("/api/articles/1/comments")
							.send({})
							.expect(400)
							.then(({ body }) => {
								expect(body.msg).to.equal("Cannot insert null data");
							});
					});
					it("GET status: 200, and return an array of comment objects for that particular article with its keys", () => {
						return request(app)
							.get("/api/articles/1/comments")
							.expect(200)
							.then(({ body }) => {
								expect(body[0]).to.contain.keys(
									"comment_id",
									"author",
									"votes",
									"created_at",
									"body"
								);
							});
					});
					it("GET status: 400, returns an empty array when a valid article has no comments ", () => {
						return request(app)
							.get("/api/articles/3/comments")
							.expect(400)
							.then(({ body }) => {
								expect(body).to.eql([]);
							});
					});
					it("GET status: 404 returns an error message if article doesnt exist for chosen comments", () => {
						return request(app)
							.get("/api/articles/99/comments")
							.expect(404)
							.then(({ body }) => {
								expect(body.msg).to.equal("Article 99 does not exist!");
							});
					});
					it("GET status: 200, and return sorted by created_at by default defaulted descending ", () => {
						return request(app)
							.get("/api/articles/1/comments")
							.expect(200)
							.then(({ body }) => {
								expect(body).be.sortedBy("created_at", { descending: true });
								expect(body).to.not.be.sortedBy("created_at", {
									descending: false
								});
							});
					});
					it("GET status: 200 and return sorted by votes in descending order by default", () => {
						return request(app)
							.get("/api/articles/1/comments?sort_by=votes")
							.expect(200)
							.then(({ body }) => {
								expect(body).be.sortedBy("votes", { descending: true });
								expect(body).to.not.be.sortedBy("created_at", {
									descending: true
								});
							});
					});
					it("GET Status: 200 and return sorted by votes in ascending order as requested", () => {
						return request(app)
							.get("/api/articles/1/comments?sort_by=votes&order=asc")
							.expect(200)
							.then(({ body }) => {
								expect(body).be.sortedBy("votes", { ascending: true });
							});
					});
					it("GET Status: 400 and returns an error if trying to sort by a column that doesnt exist", () => {
						return request(app)
							.get("/api/articles/1/comments?sort_by=fdisdfisfd")
							.expect(400)
							.then(({ body }) => {
								expect(body.msg).to.equal("Column to sort_by does not exist");
							});
					});
					it("GET Status: 200 and returns the default sorted_by by the queried input", () => {
						return request(app)
							.get("/api/articles/1/comments?order=asc")
							.expect(200)
							.then(({ body }) => {
								expect(body).be.sortedBy("created_at", { descending: false });
							});
					});
					it("GET Status: 400 and returns an error message if trying to order by anything other than ascending or descending", () => {
						return request(app)
							.get("/api/articles/1/comments?order=khfdkbsdfbk")
							.expect(400)
							.then(({ body }) => {
								expect(body.msg).to.equal(
									'Cannot order columns by khfdkbsdfbk, must use "asc" or "desc"'
								);
							});
					});
				});
			});
			xit("GET Status: 200 and returns all the articles", () => {
				return request(app)
					.get("/api/articles")
					.expect(200)
					.then(mystery => {
						console.log(mystery);
					});
			});
		});
		describe("/not-a-valid-route", () => {
			it("GET status 404, Route not found", () => {
				return request(app)
					.get("/not-a-valid-route")
					.expect(404)
					.then(error => {
						expect(error.body.msg).to.equal("Route not found");
					});
			});
		});
	});
});

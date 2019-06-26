process.env.NODE_ENV = "test";
const app = require("../app.js");
const request = require("supertest");
const chai = require("chai");
const { expect } = chai;
const connection = require("../db/connection");

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
				it("PUT status: 405 if using an invalid method", () => {
					return request(app)
						.put("/api/articles/1")
						.expect(405)
						.then(({ body }) => {
							expect(body.msg).to.equal("Method not allowed");
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
								expect(body.msg).to.equal(
									'Key (article_id)=(99) is not present in table "articles".'
								);
							});
					});
					it("POST Status:400, error when trying to insert empty object", () => {
						return request(app)
							.post("/api/articles/1/comments")
							.send({})
							.expect(400)
							.then(({ body }) => {
								expect(body.msg).to.equal("Cannot insert null data");
							});
					});
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

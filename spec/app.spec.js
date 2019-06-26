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
				it('Bad Request status:404 and returns "User...does not exist!"', () => {
					return request(app)
						.get("/api/users/angryhippo")
						.expect(404)
						.then(error => {
							expect(error.body.msg).to.equal(
								"User angryhippo does not exist!"
							);
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
				it('BAD Request status 404 with a valid number but returns "Article...does not exist!"', () => {
					return request(app)
						.get("/api/articles/999")
						.expect(404)
						.then(error => {
							expect(error.body.msg).to.equal("Article 999 does not exist!");
						});
				});
				it("Bad Request status 400 with not a number", () => {
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
			});
		});
		describe("/not-a-valid-route", () => {
			it("Bad Request status 404, Route not found", () => {
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

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
				it('GET status:404 and returns "...does not exist!"', () => {
					return request(app)
						.get("/api/users/angryhippo")
						.expect(404)
						.then(error => {
							expect(error.body.msg).to.equal("angryhippo does not exist!");
						});
				});
			});
		});
	});
});

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
	});
});

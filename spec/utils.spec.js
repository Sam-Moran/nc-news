const { expect } = require("chai");
const { formatDate, makeRefObj, formatComments } = require("../db/utils/utils");

describe("formatDate", () => {
	it("returns an empty array when passed an empty array", () => {
		const data = [];
		const actual = formatDate(data);
		const expected = [];
		expect(actual).to.eql(expected);
	});
	it("returns a single time to the current date", () => {
		const created_at = Number(new Date());
		const data = [{ created_at }];
		const actual = formatDate(data);
		const timeString = new Date();
		const expected = [timeString];
		expect(actual).to.eql(expected);
	});
});

describe("makeRefObj", () => {});

describe("formatComments", () => {});

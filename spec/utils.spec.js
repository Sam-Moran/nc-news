const { expect } = require("chai");
const { formatDate, makeRefObj, formatComments } = require("../db/utils/utils");

describe("formatDate", () => {
	it("returns an empty array when passed an empty array", () => {
		const data = [];
		const actual = formatDate(data);
		const expected = [];
		expect(actual).to.eql(expected);
	});
});

describe("makeRefObj", () => {});

describe("formatComments", () => {});

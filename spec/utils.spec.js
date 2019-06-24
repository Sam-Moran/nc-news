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
		const time = 1471522072389;
		const data = [{ time }];
		const actual = formatDate(data);
		const created_at = new Date(1471522072389);
		const expected = [{ created_at }];
		expect(actual).to.eql(expected);
	});
	it('returns an array of objects with time formatted', () => {
		cons
	});
});

describe("makeRefObj", () => {});

describe("formatComments", () => {});

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
	it("returns an array of objects with time formatted", () => {
		const data = [
			{ created_at: 1471522072389 },
			{ created_at: 1500584273256 },
			{ created_at: 1500659650346 }
		];
		const actual = formatDate(data);
		const expected1 = new Date(1471522072389);
		const expected2 = new Date(1500584273256);
		const expected3 = new Date(1500659650346);
		const final = [{ expected1 }, { expected2 }, { expected3 }];
		expect(actual).to.eql(final);
	});
});

describe("makeRefObj", () => {});

describe("formatComments", () => {});

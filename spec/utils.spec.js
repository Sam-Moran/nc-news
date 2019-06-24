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
		//const time = 1471522072389;
		const data = { created_at: 1471522072389 };
		const actual = formatDate([data]);
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
		const expected1 = new Date("2016-08-18T12:07:52.389Z");
		const expected2 = new Date("2017-07-20T20:57:53.256Z");
		const expected3 = new Date("2017-07-21T17:54:10.346Z");
		const final = [
			{ created_at: expected1 },
			{ created_at: expected2 },
			{ created_at: expected3 }
		];
		expect(actual).to.eql(final);
	});
});

describe("makeRefObj", () => {});

describe("formatComments", () => {});

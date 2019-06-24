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

	it("returns an array of objects with the time formatted with the rest of the data included", () => {
		const data = [
			{
				title: "Running a Node App",
				topic: "coding",
				author: "jessjelly",
				body:
					"This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
				created_at: 1471522072389
			},
			{
				title:
					"The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
				topic: "coding",
				author: "jessjelly",
				body:
					"Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
				created_at: 1500584273256
			}
		];
		const actual = formatDate(data);
		const expected = [
			{
				title: "Running a Node App",
				topic: "coding",
				author: "jessjelly",
				body:
					"This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
				created_at: new Date("2016-08-18T12:07:52.389Z")
			},
			{
				title:
					"The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
				topic: "coding",
				author: "jessjelly",
				body:
					"Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
				created_at: new Date("2017-07-20T20:57:53.256Z")
			}
		];
		expect(actual).to.eql(expected);
	});
});

describe("makeRefObj", () => {
	it("returns an empty object when passed an empty array", () => {
		const actual = makeRefObj([]);
		const expected = [];
		expect(actual).to.eql(expected);
	});
});

describe("formatComments", () => {});

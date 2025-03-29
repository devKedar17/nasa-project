const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const testData = [];

function isTestData(data) {
	return data["city"] == "Johannesburg" || data["city"] == "Johannesburg ";
}
function getRequiredData() {
	return new Promise((resolve, reject) => {
		fs.createReadStream(
			path.join(__dirname, "..", "data", "auto_rocket.csv")
		)
			.pipe(
				parse({
					comment: "#",
					columns: true,
				})
			)
			.on("data", (data) => {
				if (isTestData(data)) {
					testData.push(data.firstname);
				}
			})
			.on("error", (err) => {
				reject(err);
				//console.log(err);
			})
			.on("end", () => {
				console.log(`${testData} testdata found`);
				resolve();
			});
	});
}

module.exports = {
	getRequiredData,
	planets: testData,
};

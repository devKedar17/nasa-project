const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const testData = [];
function isTestData(data) {
	return (
		data["koi_disposition"] === "CONFIRMED" &&
		data["koi_insol"] > 0.36 &&
		data["koi_insol"] < 1.11 &&
		data["koi_prad"] < 1.6
	);
	//return data["city"] == "Johannesburg" || data["city"] == "Johannesburg ";
}
function getRequiredData() {
	return new Promise((resolve, reject) => {
		fs.createReadStream(
			path.join(__dirname, "..", "data", "kepler_data.csv")
		)
			.pipe(
				parse({
					comment: "#",
					columns: true,
				})
			)
			.on("data", (data) => {
				if (isTestData(data)) {
					testData.push(data);
				}
			})
			.on("error", (err) => {
				reject(err);
				//console.log(err);
			})
			.on("end", () => {
				console.log(`${testData.length} testdata found`);
				resolve();
			});
	});
}
module.exports = {
	getRequiredData,
	planets: testData,
};

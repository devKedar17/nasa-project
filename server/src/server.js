const http = require("http");
const app = require("./app");
const { getRequiredData } = require("./models/planets.model");
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
async function startServer() {
	await getRequiredData();
	server.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
}
startServer();

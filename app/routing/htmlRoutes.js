// dependencies
var path = require("path");

// routing
module.exports = function(app) {
	// html GET request that handles when users "visit" the survey page
	app.get("/survey", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/survey.html"));
	});

	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/home.html"));
	});

	// if no matching route is found, it defaults to home
	app.get("*", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/home.html"));
	});
};
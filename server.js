// dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// sets up the express app and server
var app = express();
var PORT = process.env.PORT || 8080;

// sets up the express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(path.join(__dirname, "./app/public")));

// router points the server to different route files that give the server a "map" of how to respond to user requests from various URLs
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// starts the server to begin listening
app.listen(PORT, function() {
	console.log("App listening on PORT" + PORT);
});
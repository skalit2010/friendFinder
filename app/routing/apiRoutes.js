// links the routes to the data sources
var friendsData = require("../data/friends.js");

// routing
module.exports = function(app){
	// api GET request that returns a JSON of the friends.js data
	app.get("/api/friends", function(req, res) {
		res.json(friendsData);
	});

	// api POST request that handles when a user submits the survey form
	// it runs an algorithm that matches the user to the most compatible friend and then sends the data to the server as a JSON object 
	app.post("/api/friends", function(req, res) {
		// best match object will hold most compatible friend and will update as we loop through all options
		var bestMatch = {
			name: "",
			photo: "",
			difference: 100 // compatibility is based on the lowest summation of differences in scores
		}

		// parses the result of the user's post
		var userData = req.body;
		var userScores = userData.scores;

		// this var holds the difference between the user's score and the scores of each friend in the database
		var totalDiff = 0;

		// loops through all friends in database
		for (var i = 0; i < friendsData.length; i++) {
			console.log(friendsData[i].name);
			totalDiff = 0;

			// loops through all the scores of each friend
			for (var j = 0; j < friendsData[i].scores.length; j++) {
				totalDiff += Math.abs(parseInt(userScores[j]) - parseInt(friendsData[i].scores[j]));

				// if the sum of the differences is less than the difference of the current best match
				if (totalDiff <= bestMatch.difference) {
					// set the best match to the new friend
					bestMatch.name = friendsData[i].name;
					bestMatch.photo = friendsData[i].photo;
					bestMatch.difference = totalDiff;
				}
			}
		}

		// push the user's data to the database
		friendsData.push(userData);

		// returns a JSON with the user's best match, to be used in the modal
		res.json(bestMatch);
	});
};
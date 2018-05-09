// Dependencies
var path = require("path");

// Import friends.js array
var friends = require('../app/data/friends.js');

// Export API routes
module.exports = function(app){

    // Total list of friends
    app.get('/api/friends', function(req,res){
        res.json(friends);
    });

    // Add a new friends
    app.post('/api/friends', function(req,res){
        var userInput = req.body;
        var userResponses = userInput.scores;

        // Compute friend match
        var matchName = '';
        var matchImage = '';
        var totalDifference = 10000; // Initial value is large for comparison

        // Examine existing friend in list
        for (var i=0; i<friends.length; i++){
            // Compute difference for each question
            var diff = 0;
            for (var j=0; j<userResponses.length; j++){
                diff += Math.abs(friends[i].scores[j] - userResponses[j]);
            }

            //If lowest difference, display friend match
            if (diff < totalDifference){
                totalDifference = diff;
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }

        // Push new user to friends list
        friends.push(userInput);

        // Send response
        res.json(
            {
                status: 'OK',
                matchName: matchName,
                matchImage: matchImage
            });
    });
};
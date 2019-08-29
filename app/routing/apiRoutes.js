var friendList = require("../data/friends");


module.exports = function(app) {

    // function for calculating difference between tow numbers w/o returning a negative number...
    function diff(a, b) { return Math.abs(a - b); }

    // function for calculating the sum of all elements in an array
    const sumArray = function(arr) {
        return arr.reduce((result, number) => result + number);
    }

    app.get("/api/friends", function(req, res) {
        return res.json(friendList);
    });

    app.post("/api/friends", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        let newFriend = req.body;
        console.log("new friend incoming:" + newFriend);
        // capture incoming score
        let newScore = newFriend.scores;
        // and parse as INT so we can do math
        newScore = newScore.map(function(x) {
            return parseInt(x, 10);
        });

        // creating copy of array 
        let allFriends = [];

        // loop over the copy of the friend list array and replace scores strings with integers
        friendList.forEach(element => {
            // console.log(element.scores);
            parseScores = element.scores;
            parseScores = parseScores.map(function(x) {
                return parseInt(x, 10);
            });
            allFriends.push(element);
        });

        console.log(allFriends);

        // creating array for adding array of the difference between the new score and all of the friends scores
        let bigDiffList = [];

        for (var i = 0; i < allFriends.length; i++) {
            let comparedScore = allFriends[i].scores;
            let diffList = [];
            // loop inside the loop, for each array of scores, loop over them and find the difference between each element in the array and the corresponding element in the new score array
            for (var j = 0; j < newScore.length; j++) {
                let difference = diff(newScore[j], comparedScore[j]);
                diffList.push(difference);
            }

            bigDiffList.push(diffList);

        }

        // to do; when sending out true love, make it so that the user can have multiple true loves...

        let finalDiffList = [];

        // loop over the array of arrays and find the sum of each element within each array, send that to a final array...
        bigDiffList.forEach(element => {
            let sumObj = sumArray(element);
            finalDiffList.push(sumObj);
        });

        //... and find the lowest number in the final array, the one true love with the least difference
        let matchNumber = Math.min(...finalDiffList);

        for (i = 0; i < finalDiffList.length; i++) {
            if (finalDiffList[i] == matchNumber) {
                // set match value to true of the person object with the same index as the lowest number in the final diff list array
                allFriends[i].match = "true";
                // define the one true love
                let trueLove = allFriends[i];
                // sends the response body containing the one true love, the object where match = true
                res.json(trueLove);
                //reset the match for the true love to the default of false, so the next user doesn't get the same result with different scores
                allFriends[i].match = "false";
                // breaks the for loop so it doesn't keep looping after it has found the true love
                break;
            }
        }

        console.log(allFriends);

        // wait until end of function to push new friend to friend list, so we don't match the new friend with itself
        friendList.push(newFriend);
    });
};
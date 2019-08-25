const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();

// set express configs, URLencoded so we can use POST, and set to json so we can use that format in our api
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// here, setting express config to be able to serve static files from public director
app.use(express.static("app/public"));

// function for calculating difference between tow numbers w/o returning a negative number...
function diff(a, b) { return Math.abs(a - b); }

// function for calculating the sum of all elements in an array
const sumArray = function(arr) {
    return arr.reduce((result, number) => result + number);
}

// seed friends list
let friendList = [{
    "name": "Ahmed",
    "photo": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
    "scores": [
        5,
        1,
        4,
        4,
        5,
        1,
        2,
        5,
        4,
        1
    ]
}, {
    "name": "John",
    "photo": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
    "scores": [
        2,
        3,
        5,
        2,
        1,
        2,
        1,
        4,
        3,
        2
    ]
}, {
    "name": "Paul",
    "photo": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
    "scores": [
        3,
        2,
        3,
        1,
        3,
        1,
        2,
        4,
        4,
        1
    ]
}];

// HTML Route handling

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "app/public/home.html"));

});

app.get("/:var", function(req, res) {
    let rootVar = req.params.var;
    let apiVar = req.params.friends;
    if (rootVar === "survey" || rootVar === "survey.html") {
        res.sendFile(path.join(__dirname, "app/public/survey.html"));
    } else if (rootVar === "home" || rootVar === "home.html") {
        res.sendFile(path.join(__dirname, "app/public/home.html"));
    }
    // else {
    //     res.sendFile(path.join(__dirname, "app/public/404.html"));
    // }
});

// API Route handling

app.get("/api/friends", function(req, res) {
    return res.json(friendList);
});

app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    let newFriend = req.body;

    let newScore = newFriend.scores;

    newScore = newScore.map(function(x) {
        return parseInt(x, 10);
    });

    let allScores = [];

    friendList.forEach(element => {
        // console.log(element.scores);
        element = element.scores;
        element = element.map(function(x) {
            return parseInt(x, 10);
        });
        let scoreObj = {};
        scoreObj = element;
        allScores.push(scoreObj);
    });



    let bigDiffList = [];

    for (var i = 0; i < allScores.length; i++) {

        let comparedScore = allScores[i];
        let diffList = [];
        for (var j = 0; j < newScore.length; j++) {
            let difference = diff(newScore[j], comparedScore[j]);
            diffList.push(difference);
        }
        let diffObj = {};
        diffObj = diffList;

        bigDiffList.push(diffObj);
    }

    let finalDiffList = [];
    bigDiffList.forEach(element => {
        let sumObj = sumArray(element);
        finalDiffList.push(sumObj);
    });
    console.log(finalDiffList);

    console.log(Math.min(...finalDiffList));

    // wait until end of function to push new friend to friend list, so we don't match the new friend with itself
    friendList.push(newFriend);

    res.json(newFriend);
});

// initiate server
app.listen(PORT, function() {
    console.log(`app  listening on port ${PORT}`);
});
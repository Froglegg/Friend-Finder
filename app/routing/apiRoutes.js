const apiRoutes = function() {
    app.get("/api/friends", function(req, res) {
        return res.json(friendList);
    });

    app.post("/api/friends", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var newFriend = req.body;

        console.log(newFriend);

        friendList.push(newFriend);

        res.json(newFriend);
    });

}

module.exports = apiRoutes;
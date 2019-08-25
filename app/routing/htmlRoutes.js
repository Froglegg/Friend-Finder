// Route handling
const htmlRoutes = function() {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "app/public/home.html"));

    });

    app.get("/:var", function(req, res) {
        let rootVar = req.params.var;
        if (rootVar === "survey" || rootVar === "survey.html") {
            res.sendFile(path.join(__dirname, "app/public/survey.html"));
        } else if (rootVar === "home" || rootVar === "home.html") {
            res.sendFile(path.join(__dirname, "app/public/home.html"));
        } else {
            res.sendFile(path.join(__dirname, "app/public/404.html"));
        }
    })
}

module.exports = htmlRoutes;
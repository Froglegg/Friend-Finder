let path = require("path");

// since we are exporting just this one function, no need to store module-exports into a variable, just define it outright
// define module exports as a function that takes the app parameter, which is our express instance in server.js 

module.exports = function(app) {
    // if user enters survey in URL or presses survey button, serves the survey HTML file
    app.get("/survey", function(req, res) {
        // the __dirname parameter ensures we begin ine root directory
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });

    // fallback use route for homepage
    app.use(function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });
};
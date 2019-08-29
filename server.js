const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

// set express configs, URLencoded so we can use POST, and set to json so we can use that format in our api
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// here, setting express config to be able to serve static files from public director
app.use(express.static("app/public"));

// API Route handling
require("./app/routing/apiRoutes.js")(app);
// HTML Route handling
require("./app/routing/htmlRoutes.js")(app);

// initiate server
app.listen(PORT, function() {
    console.log(`app  listening on port ${PORT}`);
});
/**
 * Created by danielabrao on 6/9/17.
 */
(function () {
    "use strict";


    var app = express(),
        server = require("http").createServer(app),
        cookieSession = require('cookie-session'),
        cookieParser = require('cookie-parser'),
        passport = require('passport');

    app.use(cookieParser());
    app.use(cookieSession({
        secret: "yourAppSecret",
        maxAge: 86400000
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express["static"](path.join(__dirname, "./client/")));
    app.use(bodyParser.json({"limit": "50mb"}));
    app.use(bodyParser.urlencoded({}));

    server.listen(6000, function () {
        console.log("Server running on port: 6000");
    });

}());

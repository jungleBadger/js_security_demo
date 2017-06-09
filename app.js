/**
 * Created by danielabrao on 6/9/17.
 */
(function () {
    "use strict";


    var express = require("express"),
        app = express(),
        server = require("http").createServer(app),
        engines = require("consolidate"),
        path = require("path"),
        ejs = require("ejs"),
        bodyParser = require("body-parser"),
        cookieSession = require("cookie-session"),
        cookieParser = require("cookie-parser"),
        passport = require("passport");

    app.use(cookieParser());
    app.use(cookieSession({
        secret: "yourAppSecret",
        maxAge: 86400000
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use(express["static"](path.join(__dirname, "./client/")));
    app.set("views", __dirname + "/client");
    app.engine("html", engines.ejs);
    app.set("view engine", "html");
    app.use(bodyParser.json({"limit": "50mb"}));
    app.use(bodyParser.urlencoded({
        "extended": true
    }));


    require("./server/passport")(passport);
    require("./server/routes")(app, passport);


    server.listen(3500, function () {
        console.log("Server running on port: 3500");
    });

}());

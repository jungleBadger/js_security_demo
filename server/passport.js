/**
 * Created by danielabrao on 5/20/17.
 */
(function () {
    "use strict";

    var LocalStrategy = require('passport-local').Strategy;
    var security = require("./security");
    var demoPassword;
    security.generateHash("jsguild").then(function (password) {
        demoPassword = password;
    });

    module.exports = function (passport) {
        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(function (user, done) {
            done(null, user);
        });
        passport.use("local-login", new LocalStrategy(
            function (username, password, done) {
                if (username === "js-guild" && security.validateHash(password, demoPassword)) {
                    done(null, {
                        "name": username,
                        "id": "demo"
                    });
                } else {
                    done(null, false);
                }
            }
        ));
    };
}());

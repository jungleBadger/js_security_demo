/**
 * Created by danielabrao on 5/20/17.
 */
(function () {
    "use strict";

    var LocalStrategy = require('passport-local').Strategy;
    var security = require("../helpers/security");

    module.exports = function (passport, matcherDB) {
        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(function (id, done) {
            User.findById(id, function(err, user) {
                done(err, user);
            });
            done(null, user);
        });
        passport.use("login", new LocalStrategy(
            function (username, password, done) {
                matcherDB.queryDocument({
                    "collection": "users",
                    "query": {
                        "selector": {
                            "email": username
                        },
                        "fields": ["_id", "password"]
                    }
                }, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (user.docs.length < 1) {
                        return done(null, false);
                    }

                    if (security.validateHash(password, user.docs[0].password)) {
                        delete user.docs[0].password;
                        return done(null, user.docs[0]._id);
                    } else {
                        return done(null, false);
                    }
                });
            }
        ));

    };
}());

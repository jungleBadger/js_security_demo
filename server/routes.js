/**
 * Created by danielabrao on 6/9/17.
 */
(function () {
    "use strict";


    var isPassportLogged = function (req, res, next) {
        if (req.user && req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect("/passportLogin");
        }
    };

    module.exports = function (app, passport) {
        app.get("/passportLogin", function (req, res) {
            return res.status(200).render("./passportLogin.html");
        });

        app.post("/passportLogin", passport.authenticate("local-login", {
            "successRedirect": "/passportLogged",
            "failureRedirect": "/passportInvalid"
        }));


        app.get("/passportLogged", isPassportLogged, function (req, res) {
            return res.status(200).render("./passportLogged.ejs", {
                "name": req.user.name
            });
        });

        app.get("/passportInvalid", function (req,res) {
            return res.status(200).render("./passportInvalid.html");

        });

        app.post("/logout", function (req, res) {
            req.logout();
            res.redirect("/passportLogin");
        });

    };

}());

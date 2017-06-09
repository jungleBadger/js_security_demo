/**
 * Created by danielabrao on 5/20/17.
 */
(function () {
    "use strict";

    var bcrypt = require("bcrypt");
    var saltRounds = 6;

    module.exports = {
        "generateHash": function (password, customSaltRounds) {
            return new Promise(function (resolve, reject) {
                bcrypt.hash(password, customSaltRounds || saltRounds).then(function (hash) {
                    resolve(hash);
                }).catch(function (err) {
                    reject(err);
                });
            });
        },
        "validateHash": function (password, hash) {
            return new Promise(function (resolve, reject) {
                bcrypt.compare(password, hash).then(function (res) {
                    if (res) {
                        resolve(res);
                    } else {
                        reject(res);
                    }
                }).catch(function (err) {
                    reject(err);
                });
            });
        },
        "validateEmailPattern": function (email) {
            return (email && email.search(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) > -1);
        },
        "generateToken": function () {

        }
    };

}());

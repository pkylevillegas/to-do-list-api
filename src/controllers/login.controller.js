const e = require('express');
const db = require('../models');
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (data) => {
    return jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn: "7200s" });
};

exports.login = (req, res) => {
    if(String(req.body.email) === "" || String(req.body.password) === ""){
        res.status(500).send({
            error: true,
            data: [],
            message: ["Email or Password is empty."]
        })
    }

    User.findOne({ where: { email: req.body.email, status: "Active" }})
    .then((data) => {
        if(data) {
            bcrypt.compare(
                req.body.password,
                data.password,
                function (err, result) {
                    if(result){
                        res.send({
                            error: false,
                            data: data,
                            token: generateToken({
                                id: data.id, 
                                email: data.email
                            }),
                            message: [process.env.SUCCESS_RETRIEVE]
                        });
                    }
                    else{
                        res.status(500).send({
                            error: true,
                            data: [],
                            message: ["Invalid Email and Password."],
                        });
                    }
                }
            );
        }
        else{
            res.status(500).send({
                error: true,
                data: [],
                message: ["Email does not exists."]
            })
        }
    })
    .catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG
        });
    });
};
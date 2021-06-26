const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.login = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(422).send({ errors: errors.array() });

    const user = await User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })

    if (user) {
        const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.LIFE_ACCESS_TOKEN
        })
        res.status(200).json({ accessToken: accessToken })
    } else
        res.status(404).json({ error: { message: "user not found" } })
}
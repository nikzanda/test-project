const db = require("../models")
const Article = db.articles
// const jwt = require("jsonwebtoken")
// const { validationResult } = require("express-validator")

exports.findAll = async (req, res) => {
    res.status(200).json(await Article.findAll())
}
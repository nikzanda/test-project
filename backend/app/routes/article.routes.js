module.exports = (router) => {
    const article = require("../controllers/article.controller")
    // const { check } = require("express-validator");

    router.get(
        "/articles/",
        article.findAll
    )
}
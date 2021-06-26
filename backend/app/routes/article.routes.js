module.exports = (router) => {
    const article = require("../controllers/article.controller")
    const token = require("../middleware/auth.middleware")

    router.get(
        "/articles/",
        token.authenticateToken,
        article.findAll
    )
}
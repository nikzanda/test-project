module.exports = (router) => {
    const user = require("../controllers/user.controller")
    const { check } = require("express-validator");

    router.post(
        "/login",
        [
            check("email").isEmail().normalizeEmail(),
            check("password").isLength({ min: 4, max: 16 })
        ],
        user.login
    )
}
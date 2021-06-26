module.exports = (router) => {
    const order = require("../controllers/order.controller")
    const token = require("../middleware/auth.middleware")
    const { check } = require("express-validator")

    router.get(
        "/orders/",
        token.authenticateToken,
        order.findAll
    )

    router.post(
        "/orders/",
        token.authenticateToken,
        [
            check("articleID").isNumeric(),
            check("quantity").isNumeric({ min: 1 })
        ],
        order.create
    )
}
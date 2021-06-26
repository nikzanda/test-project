module.exports = (router) => {
    const order = require("../controllers/order.controller")
    const { check } = require("express-validator");

    // router.get(
    //     "/articles/",
    //     article.findAll
    // )

    router.post(
        "/orders/",
        [
            check("articleID").isNumeric(),
            check("quantity").isNumeric({ min: 1 })
        ],
        order.create
    )
}
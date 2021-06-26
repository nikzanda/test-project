const db = require("../models")
const Order = db.orders
// const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")

exports.create = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(422).send({ errors: errors.array() })

    const order = await Order.create({
        user_id: req.user.id,
        article_id: req.body.articleID,
        quantity: req.body.quantity,
        status: 'pending'
    })

    if (order)
        res.status(201).json(order)
    else
        res.status(500).json({ error: { message: "errore" } })
}
const db = require("../models")
const Order = db.orders
const { validationResult } = require("express-validator")

exports.findAll = async (req, res) => {
    res.status(200).json(await Order.findAll({ where: { user_id: req.user.id } }))
}

exports.create = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(422).send({ errors: errors.array() })

    const order = await Order.create({
        user_id: req.user.id,
        articles: req.body.articles,
        status: 'pending'
    })

    if (order)
        res.status(201).json(order)
    else
        res.status(500).json({ error: { message: "errore" } })
}
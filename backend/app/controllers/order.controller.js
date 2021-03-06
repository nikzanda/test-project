const db = require("../models")
const Order = db.orders
const Article = db.articles
const { validationResult } = require("express-validator")

exports.findAll = async (req, res) => {
    const orders = await Order.findAll({ where: { user_id: req.user.id } })

    let articles = orders.map(order => JSON.parse(order.articles).map(article => article.id))
    articles = await Article.findAll({
        where: {
            id: articles.flat()
        }
    })
    articles = articles.map(article => article.dataValues)

    res.status(200).json(orders.map(order => ({
        ...order.dataValues,
        articles: JSON.parse(order.articles).map(article => ({
            ...articles.find(thatArticle => thatArticle.id === article.id),
            cartQuantity: article.quantity
        }))
    })))
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

exports.update = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(422).send({ errors: errors.array() })

    const order = await Order.findByPk(req.params.orderID)

    if (!order)
        return res.sendStatus(404)

    if (req.body.articles)
        order.articles = req.body.articles

    if (req.body.status === "settled") {
        order.status = req.body.status

        JSON.parse(order.articles).forEach(article => {
            Article.increment('quantity', { by: article.quantity * -1, where: { id: article.id } })
        })
    }//if

    await order.save()

    res.status(202).json(order)
}

exports.delete = async (req, res) => {
    const order = await Order.findByPk(req.params.orderID)

    if (!order)
        return res.sendStatus(404)

    order.destroy()

    res.sendStatus(204)
}
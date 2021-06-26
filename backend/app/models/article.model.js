module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("article", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    })

    Article.create({ name: "Prodotto 1", quantity: 10 })
    Article.create({ name: "Prodotto 2", quantity: 100 })
    Article.create({ name: "Prodotto 3", quantity: 14 })
    Article.create({ name: "Prodotto 4", quantity: 53 })
    Article.create({ name: "Prodotto 5", quantity: 30 })

    return Article
}
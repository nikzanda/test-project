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
        },
        unitPrice: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        }
    })

    Article.create({ id: 1, name: "Switch", quantity: 10, unitPrice: 25.5 })
    Article.create({ id: 2, name: "Computer", quantity: 100, unitPrice: 650.0 })
    Article.create({ id: 3, name: "Raspberry", quantity: 14, unitPrice: 60.0 })
    Article.create({ id: 4, name: "Router", quantity: 53, unitPrice: 40.0 })
    Article.create({ id: 5, name: "Powerline", quantity: 30, unitPrice: 50.0 })

    return Article
}
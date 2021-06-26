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

    Article.create({ name: "Switch", quantity: 10 })
    Article.create({ name: "Computer", quantity: 100 })
    Article.create({ name: "Raspberry", quantity: 14 })
    Article.create({ name: "Router", quantity: 53 })
    Article.create({ name: "Powerline", quantity: 30 })

    return Article
}
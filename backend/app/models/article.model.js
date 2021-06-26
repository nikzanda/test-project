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

    return Article
}
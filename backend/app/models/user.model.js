module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        }
    })

    return User
}
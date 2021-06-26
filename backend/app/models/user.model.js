module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        }
    })

    return User
}
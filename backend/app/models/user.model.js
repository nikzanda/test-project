module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING
        }
    })

    User.create({ email: "test@mail.com", password: "1234", name: "John Doe" })

    return User
}
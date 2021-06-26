module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        articles: {
            type: Sequelize.JSON
        },
        // article_id: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: "articles",
        //         key: "id"
        //     }
        // },
        // quantity: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     defaultValue: 1
        // },
        status: {
            type: Sequelize.ENUM('pending', 'settled'),
            allowNull: false
        }
    })

    return Order
}
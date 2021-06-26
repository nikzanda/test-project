const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.NAME, dbConfig.USER, dbConfig.PASS, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./user.model.js")(sequelize, Sequelize);
db.tutorials = require("./article.model.js")(sequelize, Sequelize);
db.tutorials = require("./order.model.js")(sequelize, Sequelize);

module.exports = db;
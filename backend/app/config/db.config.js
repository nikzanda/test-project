const path = require('path');
require("dotenv").config({ path: path.join(__dirname, `${process.env.NODE_ENV || "development"}.env`) });

module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASS,
    NAME: process.env.DB_NAME,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
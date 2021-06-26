const path = require('path')
require("dotenv").config({ path: path.join(__dirname, `${process.env.NODE_ENV || "development"}.env`) })

const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()

app.use(cors())
app.use(bodyParser.json()) // content-type: application/json
app.use(bodyParser.urlencoded({ extended: true })) // content-type: application/x-www-form-urlencoded

const db = require("./app/models")
db.sequelize.sync({ force: true }) // { alter: true }

require("./app/routes/user.routes.js")(app)
require("./app/routes/article.routes.js")(app)
require("./app/routes/order.routes.js")(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Environment: ${process.env.NODE_ENV}`)
    console.log(`Server running on port ${PORT}.`)
})
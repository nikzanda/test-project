const jwt = require("jsonwebtoken")

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    const publicPath = ["/login"]

    if (token == null && !publicPath.includes(req.route.path))
        return res.sendStatus(401)

    if (token != null)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err)
                return res.sendStatus(403)
            req.user = user
            next()
        })
    else next()
}

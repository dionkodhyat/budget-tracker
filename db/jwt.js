const { sign, verify } = require('jsonwebtoken');

const createToken = user => {
    const token = sign({ username: user.name, email : user.email, id : user.id }, "totallynotsecuresecret");
    return token
}

const validateToken = (req, res, next) => {
    const token = req.cookies["access-token"];
    if (!token) return res.sendStatus(401);

    try {
        const validToken = verify(token, "totallynotsecuresecret");
        if (validToken) {
            req.body.userID = validToken.id;
            next();
        }
    } catch (err) {
        return res.status(400).json({ error : err })
    }
}

module.exports = {
    createToken,
    validateToken
}
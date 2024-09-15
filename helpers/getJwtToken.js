const jwt = require('jsonwebtoken')

// hum jwt token me user ki id store krege.
const getJwtToken = (userId) => {
    return jwt.sign({userId: userId}, process.env.JWT_SECRET, {expiresIn: '1 day'})
}

module.exports = getJwtToken;
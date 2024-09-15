const prisma = require('../prisma/index');

const jwt = require('jsonwebtoken');

// is middleware ki help se hum check krege ki user login h ya nhi. Yadi user login hoga toh aage vale routes execute ho jaiye aur ysdi login nhi hoga toh hum isme error throw kar dege.
// hum jwt token ko decode krege aur usme se userId le lege jo ki humne token bnate time save ki thi jwt token me. Us id k basics pr hum db me user ko find krege.
const isLoggedIn = async(req, res, next) => {

    try {
        
        const token = req.cookies.token;

        if(!token) {
            res.send("Please login");
            throw new Error('You are not logged in'); 
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await prisma.user.findUnique({
            where: {
                id: decode.userId,
            }
        })

        next();

    } catch (error) {
       throw new Error(error); 
    }
}

module.exports = isLoggedIn;
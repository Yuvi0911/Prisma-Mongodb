// bring in prisma and cookie

const prisma = require('../prisma/index')
const cookieToken = require('../utils/cookieToken');

// user signup
exports.signup = async(req, res, next) => {
    try {
        // frontend se user ka name, email aur password milega.
        const { name, email, password } = req.body;

        // yadi inme se koi bhi field nhi hogi toh hum error throw kr dege.
        if(!name || !email || !password){
            throw new Error('Please provide all fields')
        }

        // prisma ki help se hum db me user create kr dege jisne signup kiya h.
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })

        // user signup krega toh uski cookies me 1 tooken set krdege.
        // send user a token
        cookieToken(user, res);

    } catch (error) {
        throw new Error(error);
    }
} 

exports.Login = async(req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            throw new Error("Please enter all fields");
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        if(!user) {
            throw new Error("User not found");
        }

        if(user.password !== password){
            throw new Error("Incorrect password")
        }

        cookieToken(user, res);

    } catch (error) {
        throw new Error("Something went wrong", error);
    }
}

exports.Logout = async (req, res) => {
    try {
        // hum directly cookie me se token ko clear krdege jiska naam 'token' h.
        res.status(200).clearCookie('token').json({
            success: true,
            message: "Logout Successfully"
        })
    } catch (error) {
        throw new Error(error);
    }
}
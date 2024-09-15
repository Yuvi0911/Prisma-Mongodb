const prisma = require('../prisma/index');

// create a new post
exports.createPost = async (req, res, next) => {
    try {
        // frontend se data lege form me se.
        const { slug, title, body, authorId } = req.body;

        // db me us data k saath 1 post create kr dege.
        const result = await prisma.post.create({
            data: {
                slug,
                title,
                body,
                // iski help se hum user model se connect krege.
                author: {connect: {id: authorId}}
            }
        });
        // response me result bhej dege.
        res.json(result);

    } catch (error) {
        throw new Error(error);
    }
}

// update an existing post
exports.updatePost = async (req, res) => {
    try {
        // hume jab bhi post ko update krna hoga toh hum frontend me us post pr click krege jis se hum us post k dynamic route pr chle jaiye ge. Us route me us post ki id hogi jise hum params ki help se ectract kr lege.
        const {id} = req.params;
        const { title, body } =req.body;

        // hum id k basics pr us post ko find krege aur uske data ko update kr dege.
        const result = await prisma.post.update({
            where: {
                id: id
            },
            data: {
                title: title,
                body: body
            }
        })

        res.json(result);
        
    } catch (error) {
        throw new Error(error);
    }
}

// delete a post
exports.deletePost = async (req, res) => {
    try {
        const {id} = req.params;

        const result = await prisma.post.delete({
            where: {
                id
            }
        });

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            result
        })
    } catch (error) {
        throw new Error(error);
    }
}

// get all post
exports.getAllPost = async (req, res) => {
    try {
        const result = await prisma.post.findMany();

        res.json(result);

    } catch (error) {
        throw new Error(error);
    }
}
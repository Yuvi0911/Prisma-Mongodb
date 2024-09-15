const express = require('express')
const router = express.Router();

const isLoggedIn = require('../middlewares/isLoggedIn');
const { createPost, updatePost, deletePost, getAllPost } = require('../controllers/postControllers');


// phle isLoggedIn middleware run hoga aur vo check krega ki user login h ya nhi yadi user login nhi h toh error throw kr dega aur login h toh next route pr chla jaiye ga.
router.route('/create').post(isLoggedIn, createPost);

router.route('/update/:id').put(isLoggedIn, updatePost);

router.route('/delete/:id').delete(isLoggedIn, deletePost);

router.route('/get').get(getAllPost);

module.exports = router;
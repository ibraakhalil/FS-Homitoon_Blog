const router = require("express").Router()
const { isAuthenticated } = require("../controllers/authController")
const { getMyComment } = require("../controllers/myCommentController")


router.get('/my-comments', isAuthenticated, getMyComment)


module.exports = router
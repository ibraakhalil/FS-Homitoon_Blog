const router = require("express").Router()
const { getBookmark } = require("../api/bookmarkController")
const { getLike, getDislike } = require("../api/likeDislikeController")
const { isAuthenticated } = require("../controllers/authController")
const { commentPost, replyComment } = require("../api/commentController")
const userInfo = require("../api/userinfo")


router.post("/comments/:postId" , isAuthenticated, commentPost )
router.post("/comments/replies/:commentId", isAuthenticated, replyComment )


router.get("/like/:postId", getLike)
router.get("/dislike/:postId", getDislike)
router.get("/bookmark/:postId", isAuthenticated, getBookmark)


router.get('/my/userinfo', userInfo)


module.exports = router
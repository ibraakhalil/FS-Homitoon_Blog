const router = require("express").Router()
const { getAllPost } = require("../controllers/allPostController");
const { isAuthenticated } = require("../controllers/authController");
const { getCreatePost, postCreatePost, getPostEdit, postEdit, deletePost, postAuthentication, getMyPost, getSinglePost } = require("../controllers/postController");
const upload = require("../middlewares/upload");



router.get("/", getAllPost)
router.get("/explore/:postId", getSinglePost)


router.get("/create", isAuthenticated, getCreatePost)
router.post("/create", upload.single("thumbnail"), isAuthenticated, postCreatePost)

router.get("/my-post", isAuthenticated, getMyPost)

router.get("/edit/:postId", isAuthenticated, postAuthentication, getPostEdit)
router.post("/edit/:postId", postAuthentication, upload.single("thumbnail"), postEdit)


router.get("/delete/:postId", postAuthentication, deletePost)

module.exports = router; 
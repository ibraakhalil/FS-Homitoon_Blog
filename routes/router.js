const router = require("express").Router()
const getFlashMessage = require("../utils/flash")
const Post = require("../models/post")
const authRoute = require("./authRoute")
const profileRoute = require("./profileRoute")
const postRoute = require("./postRoute")
const dashboardRoute = require("./dashboardRoute")
const apiRoute = require("./apiRoute")
const searchRoute = require("./searchRoute")
const authorRoute = require("./authorRoute")
const myCommentRoute = require("./myCommentRoute")


router.use("/auth", authRoute)
router.use("/profile", profileRoute)
router.use("/dashboard", dashboardRoute)
router.use("/post", postRoute)
router.use("/api", apiRoute)
router.use('/search', searchRoute)
router.use('/author', authorRoute)
router.use('/comment', myCommentRoute)




router.get("/", async (req, res, next) => {
    console.log(req.session)
    const posts = await Post.find()
        .populate({
            path: 'author',
            select: "name profilePic"
        })

    res.render("pages/index", {
        flash: getFlashMessage(req),
        posts
    })
})

router.use((req, res, next) => {
    let err = new Error('404 Page not found')
    err.status = 404
    next(err)
})
router.use((err, req, res, next) => {
    if (err.status === 404) {
        return res.render('pages/error/404', {flash: getFlashMessage(req)})
    }

    console.log(err.message);
    res.render("pages/error/500", {flash: {}})
})


module.exports = router; 
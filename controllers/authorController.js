const User = require("../models/user")
const Post = require("../models/post")
const getFlashMessage = require("../utils/flash")

 

const getAuthor = async (req, res, next) => {
    const userId = req.params.userId

    try {
        let author = await User.findById(userId)
            .populate({
                path: 'profile'
            })
        let posts = await Post.find({author: author._id})

        res.render('pages/user/author', {
            author,
            posts,
            flash: getFlashMessage(req)
        })

    } catch (err) {
        next(err)
    }
}


module.exports = { getAuthor }
const Comment = require('../models/comment')
const getFlashMessage = require('../utils/flash')


const getMyComment = async (req, res, next) => {
    let comments = await Comment.find(
        { user: req.user._id })
        .populate({
            path: 'post',
            select: '_id title'
        })

    res.render("pages/post/my-comment", {
        flash: getFlashMessage(req),
        comments
    })
}


module.exports = { getMyComment }
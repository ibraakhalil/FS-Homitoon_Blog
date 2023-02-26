const Post = require("../models/post")
const Comment = require("../models/comment")


const commentPost = async (req, res, next) => {
    const { postId } = req.params
    const { body } = req.body

    let comment = new Comment({
        post: postId,
        user: req.user._id,
        body,
        replies: [] 
    })

    try {
        let createComment = await comment.save()

        await Post.findOneAndUpdate(
            { _id: postId },
            { $push: { "comments": createComment._id } }
        )

        let commentJson = await Comment.findById(createComment._id)
            .populate({
                path: "user",
                select: "profilePic name"
            })
            
        return res.status(201).json(commentJson)

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Server Error Occured"
        })
    }
}


const replyComment = async (req, res, next) => {
    let { commentId } = req.params
    let { body } = req.body

    let reply = {
        body,
        user: req.user._id
    }

    await Comment.findOneAndUpdate(
        { _id: commentId },
        { $push: { 'replies': reply } }
    )

    res.status(201).json({
        ...reply,
        profilePic: req.user.profilePic
    })
}




module.exports = { commentPost, replyComment }
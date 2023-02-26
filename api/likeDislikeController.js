const User = require("../models/user")
const Post = require("../models/post")



const getLike = async (req, res, next) => {
    if(!req.user) {
        return res.status(403).json({
            error: "You are not authenticated user"
        })
    }
    const postId = req.params.postId
    const userId = req.user._id
    const post = await Post.findById(postId)
    let like = null

    
    try {
        if(post.dislikes.includes(userId)) {
            await Post.findByIdAndUpdate(
                { _id: postId },
                { $pull: { "dislikes": userId } }
            )
            like = false
        }

        if(post.likes.includes(userId)) {
            await Post.findByIdAndUpdate(
                { _id: postId },
                { $pull: { "likes": userId } }
            )
            like = false
            
        } else {
            await Post.findByIdAndUpdate(
                { _id: postId },
                { $push: { "likes": userId } }
            )
            like = true
        }

        const updatedPost = await Post.findById(postId)
        res.status(200).json({
            like,
            likesCount: updatedPost.likes.length,
            dislikesCount: updatedPost.dislikes.length
        })

    } catch (err) {
        console.log(err);
    }
}




const getDislike = async (req, res, next) => {
    if(!req.user) {
        return res.status(403).json({
            error: "You are not authenticated user"
        })
    }

    const postId = req.params.postId
    const userId = req.user._id
    const post = await Post.findById(postId)
    let dislike = null

    try {
        if(post.likes.includes(userId)) {
            await Post.findByIdAndUpdate(
                { _id: postId },
                { $pull: { "likes": userId } }
            )
            dislike = false
        }

        if(post.dislikes.includes(userId)){
            await Post.findByIdAndUpdate(
                { _id: postId },
                { $pull: { "dislikes": userId } }
            )
            dislike = false           
        } else {
            await Post.findByIdAndUpdate(
                { _id: postId },
                { $push: { "dislikes": userId } }
            )
            dislike = true 
        }
    
        
        const updatedPost = await Post.findById(postId)
        res.status(200).json({
            dislike,
            likesCount: updatedPost.likes.length,
            dislikesCount: updatedPost.dislikes.length
        })

    } catch (err) {
        console.log(err);
    }
}




module.exports = { getLike, getDislike }
const getFlashMessage = require("../utils/flash")
const Post = require("../models/post")
const Profile = require("../models/profile")
const Comment = require("../models/comment")
const fs = require("fs")


const getSinglePost = async (req, res, next) => {
    const postId = req.params.postId

    try {
        const post = await Post.findById(postId)
            .populate({
                path: 'author',
                select: 'name _id profilePic'
            })
        
        const comments = await Comment.find({post: post._id})
            .populate({
                path: 'user',
                select: 'name profilePic'
            })
            .populate({
                path: 'replies.user',
                select: 'name profilePic'
            })

        res.render("pages/post/singlePost", {
            post,
            filter: "month",
            comments: comments.reverse(),
            flash: getFlashMessage(req)
        })
               
    } catch (err) {
        console.log(err);
    }
}

const getCreatePost = (req, res, next) => {
    res.render("pages/post/createPost", {
        flash: getFlashMessage(req),
        error: "",
        value: ""
    })
}

const postCreatePost = async (req, res, next) => {
    let { title, body, tags} = req.body
    if(tags) {
        tags = tags.split(",")
    }
    const post = new Post({
        title,
        body,
        tags,
        thumbnail: req.file ? req.file.filename : "postDefault.jpg",
        author: req.user._id,
        comments: [],
        likes: [],
        dislikes: []
    })
    
    try {

        const savePost = await post.save()
        await Profile.findOneAndUpdate(
            {_id: req.user.profile},
            {"$push": {"posts": savePost._id}}
        )

        req.flash("success", "Post Created Successfully")
        res.redirect(`/post/edit/${savePost._id}`)
        
    } catch (e) {
        next(e)
    }
}

const getPostEdit = async (req, res, next) => {
    const postId = req.params.postId

    try {
        const post = await Post.findOne({_id: postId})
        res.render("pages/post/editPost", {
            flash: getFlashMessage(req),
            error: "",
            post
        })        
    } catch (e) {
        next(e)
    }
} 

const postEdit = async (req, res, next) => {
    let {title, body, tags} = req.body;
    const postId = req.params.postId;
    tags ? tags = tags.split(",") : tags;

    try {
        const post = await Post.findOne({_id: postId})
        if(req.file) {
            
            fs.unlink(`public/uploads/${post.thumbnail}`, (err) => {
                if(err) {
                    console.log(err);
                }
            })
        }
        await Post.findOneAndUpdate(
            {_id: postId},
            {$set: {
                title,
                body,
                tags,
                thumbnail: req.file ? req.file.filename : post.thumbnail
            }}
        )        
    } catch (e) {
        next(e)
    }

    req.flash("success", "Post Updated Successfully")
    res.redirect("/post")
}

const deletePost = async (req, res, next) => {
    const postId = req.params.postId
    try { 
        const post = await Post.findOneAndDelete({_id: postId})
        await Profile.findOneAndUpdate(
            {_id: req.user.profile},
            {$pull: {'posts': post._id}}
        )

        fs.unlink(`public/uploads/${post.thumbnail}`, (err) => {
            if(err) {
                next(err)
            }
        })  

    } catch (e) {
        next(e)
    }

    req.flash("success", "Post Delete Successfully")
    res.redirect("/")
}

const getMyPost = async (req, res, next) => {
    const profile = await Profile.findOne({_id: req.user.profile})
    const posts = await Post.find({author: req.user._id})

    res.render("pages/post/mypost", {
        flash: getFlashMessage(req),
        posts
    })
}
 
const postAuthentication = async (req, res, next) => {
    const { postId } = req.params
    const post = await Post.findOne({_id: postId})
    if(!post) {
        req.flash("fail", "You have no access this post")
        return res.redirect("/post/create")
    }

    next()
}

module.exports = { getCreatePost, postCreatePost, postAuthentication, getPostEdit, postEdit, getMyPost, getSinglePost, deletePost}
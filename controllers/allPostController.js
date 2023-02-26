const Post = require("../models/post")
const moment = require("moment")
const getFlashMessage = require("../utils/flash")
const Profile = require("../models/profile")




let filterObj = {}
let order = 1
let generateDate = (days) => {
    return moment().subtract(days, 'days').toDate()
}
let generateFilterObject = (filter) => {
    if (filter === "latest") {
        filterObj = {}
        order = 1
    }
    if (filter === "week") {
        filterObj = {
            createdAt: {
                $gt: generateDate(7)
            }
        }
        order = -1
    }

    if (filter === "month") {
        filterObj = {
            createdAt: {
                $gt: generateDate(30)
            }
        }
        order = -1
    }
    if (filter === "all") {
        filterObj = {}
        order = -1
    }

    return {
        filterObj,
        order
    }
}

const getAllPost = async (req, res, next) => {

    let filter = req.query.filter || "latest"
    let pageNumber = req.query.page
    const perPagePost = 3

    const { filterObj, order } = generateFilterObject(filter.toLowerCase())

    const posts = await Post.find(filterObj)
        .sort(order === 1 ? "-createdAt" : "createdAt")
        .populate({
            path: 'author',
            select: "name profilePic"
        })
        .skip((pageNumber * perPagePost) - perPagePost)
        .limit(perPagePost)

    let totalPost = await Post.countDocuments()
    let totalPage = totalPost / perPagePost
    let bookmarks = []

    if(req.user) {
        const profile = await Profile.findById(req.user.profile)

        bookmarks = profile.bookmarks
    }


    res.render("pages/post/allPost", {
        flash: getFlashMessage(req),
        posts,
        filter,
        totalPage,
        pageNumber,
        bookmarks
    })
}




module.exports = { getAllPost }
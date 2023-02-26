const mongoose = require("mongoose")


const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    profilePic: String,
    name: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    bio: {
        type: String,
        required: true,
        maxlength: 500
    },
    links: {
        website: String,
        facebook: String,
        twitter: String,
        github: String
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]

     
}, { timestamps: true })



module.exports = mongoose.model("Profile", profileSchema);
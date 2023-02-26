const mongoose = require("mongoose")


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    thumbnail: String,
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
    
},{timestamps: true})

postSchema.index({
    title: 'text',
    tags: 'text',
    body: 'text'
}, {
    weights: {
        title: 5,
        tags: 5,
        body: 1
    }
})

module.exports = mongoose.model("Post", postSchema)
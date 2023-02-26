const Profile = require("../models/profile")



const getBookmark = async (req, res, next) => {
    const postId = req.params.postId

    if(!req.user) {
        return res.status(403).json({
            error: "You are not authenticated user!"
        })
    }

    const userId = req.user._id
    let bookmark = null

    try {
        const profile = await Profile.findOne({user: userId})

        if(profile.bookmarks.includes(postId)) {
            await Profile.findOneAndUpdate(
                {user: userId},
                {$pull: {'bookmarks': postId}}
            )
            bookmark = false
    
        } else {
            await Profile.findOneAndUpdate(
                {user: userId},
                {$push: {'bookmarks': postId}}
            )
            bookmark = true        
        }
    
        res.status(200).json({
            bookmark
        })
                
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Server error occured"
        })
    }
}


module.exports = { getBookmark }
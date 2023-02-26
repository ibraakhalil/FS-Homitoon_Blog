const getFlashMessage = require("../utils/flash")
const Profile = require("../models/profile")


const getDashboard = async (req, res, next) => {
    

    const profile = await Profile.findById(req.user.profile)
        .populate({
            path: 'posts',
            options: {
                limit: 6,
                sort: {created: -1}
            } 
        })
        .populate({
            path: 'bookmarks'
        })

    res.render("pages/user/dashboard", {
        flash: getFlashMessage(req),
        profile
    })
}



module.exports = {getDashboard}












const User = require("../models/user")
const Profile = require("../models/profile")

const bindUserWithReq = () => {
    
    return async (req, res, next) => {
        if(!req.session.isLogin) {
            return next()
        }

        const user = await User.findById(req.session.user._id)
        const profile = await Profile.findOne({user:req.session.user._id})

        req.user = user;
        if(profile) {
            req.profile = profile;
        }

        next()
    }
}

module.exports = bindUserWithReq
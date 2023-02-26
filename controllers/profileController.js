const Profile = require("../models/profile")
const User = require("../models/user")
const fs = require("fs")
const bcrypt = require('bcrypt')
const { validationResult } = require("express-validator")
const getFlashMessage = require("../utils/flash")

const getProfile = async (req, res, next) => {

    res.render("pages/user/profile", {
        flash: getFlashMessage(req)
    })
}

const getEditProfile = (req, res, next) => {
    res.render("pages/user/editProfile", {
        error: "",
        value: "",
        flash: getFlashMessage(req)
    })
}

const postEditProfile = async (req, res, next) => {
    const errors = validationResult(req).formatWith(e => e.msg)
    const { name, title, bio, website, facebook, github, twitter } = req.body
    const id = req.user.id
    const profile = await Profile.findOne({ user: id })
    if (!errors.isEmpty()) {
        req.flash("fail", "Check your form!")
        return res.render("pages/user/editProfile", {
            error: errors.mapped(),
            value: { name, title, bio },
            flash: getFlashMessage(req)
        })
    }
    const editProfile = new Profile({
        user: id,
        name,
        title,
        bio,
        profilePic: req.file ? req.file.filename : "default.png",
        links: {
            website,
            facebook,
            github,
            twitter
        }
    })

    try {
        if (!profile) {
            req.flash("success", "Profile Created Successfully")
            let createdProfile = await editProfile.save()
            await User.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        name,
                        profile: createdProfile._id,
                        profilePic: createdProfile.profilePic
                    }
                },
                { new: true }
            )
        } else {
            req.flash("success", "Profile Updated Successfully")
            let updatedProfile = await Profile.findOneAndUpdate(
                { user: profile.user },
                {
                    $set: {
                        name,
                        title,
                        bio,
                        profilePic: !req.file ? req.user.profilePic : req.file.filename,
                        links: {
                            website,
                            facebook,
                            github,
                            twitter
                        }
                    }
                },
                { new: true }
            )
            await User.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        name,
                        profilePic: updatedProfile.profilePic
                    }
                },
                { new: true }
            )

            const picPath = `public/uploads/${profile.profilePic}`

            if (req.file && fs.existsSync(picPath) && profile.profilePic !== "default.png") {
                fs.unlink(picPath, (err) => {
                    err ? console.log(err) : ""

                })
            }
        }
    } catch (e) {
        next(e)
    }

    res.redirect("/profile")
}

const isAuthenticate = (req, res, next) => {
    const auth = req.user
    if (!auth) {
        req.flash("fail", "Please Login First")
        return res.redirect("login")
    }
    next()
}

const profileAuthentication = async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.user.id })
    if (!profile) {
        return res.redirect("/profile/edit-profile")
    }
    next()
}



module.exports = { getProfile, getEditProfile, postEditProfile, isAuthenticate, profileAuthentication }
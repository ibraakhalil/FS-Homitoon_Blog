const User = require("../models/user")
const { validationResult } = require("express-validator")
const getFlashMessage = require("../utils/flash")
const bcrypt = require("bcrypt")

const getLogin = (req, res, next) => {
    res.render("pages/user/login", {
        error: "",
        value: "",
        flash: getFlashMessage(req)
    })
}
const getRegister = (req, res, next) => {
    res.render("pages/user/registration", {
        error: "",
        value: "",
        flash: getFlashMessage(req)
    })
} 



////////////////////Login User////////////////////////////
//////////////////////////////////////////////////////////

const postLogin = async (req, res, next) => {
    const { email, password } = req.body
    const errors = validationResult(req).formatWith(err => err.msg)
    if(!errors.isEmpty()) {
        req.flash("fail", "Check Your Input Field!")
        return res.render("pages/user/login", {
            error: errors.mapped(),
            value: { email },
            flash: getFlashMessage(req)
        })
    }

    try {
        const user = await User.findOne({ email })

        if (!user) {
            req.flash("fail", "Wrong Cradential!")
            return res.render("pages/user/login", {
                error: {
                    email: "User Not Found",
                    password: ""
                },
                value: { email },
                flash: getFlashMessage(req)
            })
        }

        const matchPass = await bcrypt.compare(password, user.password)
        if (!matchPass) {
            req.flash("fail", "Check Your Input Field!")
            return res.render("pages/user/login", {
                error: {
                    email: "",
                    password: "Password Not Match!"
                },
                value: { email },
                flash: getFlashMessage(req)
            })
        }

        req.flash("success", "Logged in successfully")
        req.session.isLogin = true;
        req.session.user = user
        req.session.save(e => e ? next(e) : res.redirect("/profile"))

    } catch (e) {
        next(e)
    }

}


////////////////////Create User////////////////////////////
///////////////////////////////////////////////////////////

const postRegister = async (req, res, next) => {
    const { name, email, password } = req.body
    const errors = validationResult(req).formatWith(err => err.msg)
    if (!errors.isEmpty()) {
        req.flash("fail", "Check Your Input Field")
        return res.render("pages/user/registration", {
            error: errors.mapped(),
            value: { name, email },
            flash: getFlashMessage(req)
        })
    }

    try {
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name,
            email,
            password: hashPassword
        })

        const user = await User.findOne({ email })
        if (user) {
            req.flash("fail", "Wrong Cradential!")
            return res.render("pages/user/registration", {
                error: { email: "User Already Exist!" },
                value: { name, email },
                flash: getFlashMessage(req)
            })
        }

        req.flash("success", "User Successfully Created!")
        await newUser.save()
        res.redirect("login")

    } catch (e) {
        next(e)
    }
}


////////////////////Change Password//////////////////////
/////////////////////////////////////////////////////////

const getChangePassword = (req, res, next) => {
    res.render("pages/user/changePass", {
        flash: getFlashMessage(req),
        error: ''
    })
}
const postChangePassword = async (req, res, next) => {
    let { oldPassword, confirmPass } = req.body
    let errors = validationResult(req).formatWith(err => err.msg)
    if(!errors.isEmpty()) {
        req.flash('fail', 'Check your input field!')
        return res.render("pages/user/changePass", {
            flash: getFlashMessage(req),
            error: errors.mapped()
        })
    }


    try {
        let user = await User.findById(req.user._id)
        let passMatch = await bcrypt.compare(oldPassword, user.password)

        if (!passMatch) {
            req.flash('fail', 'Old Password Not Match!')
            return res.render("pages/user/changePass", {
                flash: getFlashMessage(req),
                error: {
                    oldPassword: 'Password not match'
                }
            })
        }

        let hashPassword = await bcrypt.hash(confirmPass, 10)
        await User.findOneAndUpdate(
            { _id: req.user._id },
            { $set: { 'password': hashPassword } }
        )
        req.flash('success', 'Password Successfully Changed')
        res.render("pages/user/changePass", {
            flash: getFlashMessage(req),
            error: ''
        })

    } catch (err) {
        next(err)
    }
}


////////////////////////End///////////////////////////////




const isLogin = (req, res, next) => {
    const auth = req.user
    if (auth) {
        return res.redirect("/profile")
    }
    next()
}

const isAuthenticated = (req, res, next) => {
    const auth = req.user
    if (!auth) {
        return res.redirect("/auth/login")
    }
    next()
}

const logOut = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return next(err)
        }
    })
    res.redirect("login")
}


module.exports = { getLogin, postLogin, getRegister, postRegister, getChangePassword, postChangePassword, isLogin, isAuthenticated, logOut }
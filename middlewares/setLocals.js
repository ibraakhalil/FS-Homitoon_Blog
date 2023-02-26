const cheerio = require("cheerio")
const moment = require("moment")

const setLocals = async (req, res, next) => {

    res.locals.url = req.originalUrl
    res.locals.isLogin = req.session.isLogin
    res.locals.user = req.user
    res.locals.profile = req.profile
    res.locals.extractText = (node) => {
        let text = cheerio.load(node).text()

        if(text.length < 200) return text
        return text.substr(0, 200) + "...."
    }
    res.locals.moment = (time) => {
        return moment(time).fromNow()
    }

    next()
}

module.exports = setLocals
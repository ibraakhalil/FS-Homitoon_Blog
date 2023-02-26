
const userInfo = (req, res, next) => {
    console.log(req.session)
    res.json({info: req.session.user})
}

module.exports = userInfo
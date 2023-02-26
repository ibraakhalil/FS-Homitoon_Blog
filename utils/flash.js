const getFlashMessage = (req) => {

    return {
        success: req.flash("success"),
        fail: req.flash("fail")
    }
}

module.exports = getFlashMessage
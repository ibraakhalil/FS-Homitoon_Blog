const { body } = require("express-validator")


const editProfileValidator = [
    body("name")
        .isLength({ min: 3, max: 20 }).withMessage("Must be 3 to 20 charts")
        .trim()
    ,
    body("title")
        .isLength({ min: 5, max: 100 }).withMessage("5 to 200 charts")

    ,
    body("bio")
        .isLength({ min: 5, max: 200 }).withMessage("5 to 200 charts")
]


module.exports = { editProfileValidator }
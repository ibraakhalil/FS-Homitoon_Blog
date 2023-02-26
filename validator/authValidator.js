const { body } = require("express-validator");

const signupValidator = [
    body("name")
        .isLength({ min: 3, max: 20 })
        .withMessage("Name must be 3 to 20 charts")
        .trim()
    ,
    body("email")
        .isEmail()
        .withMessage("Provid a Valid Email")
        .trim()
        .normalizeEmail()
    ,
    body("password")
        .isLength({ min: 5 })
        .withMessage("Password minimum 5 charts")
    ,
    body("confirmPass")
        .isLength({ min: 5 })
        .withMessage("Password must be 5 charts")
        .custom((password, { req }) => {
            if (req.body.password !== password) {
                throw new Error("Password Not Match");
            }
            return true; //it must be used for confirmPassword
        }),
];

const loginValidator = [
    body("email")
        .isEmail()
        .withMessage("Provide Valid Email")
        .trim()
        .normalizeEmail()
    ,
    body("password")
        .isLength({ min: 5 }).withMessage("Password Must be 5 charts")
];

const changePasswordValidator = [
    body('oldPassword')
        .isLength({ min: 5 }).withMessage("Must be 5 charts")
    ,
    body('newPassword')
        .isLength({ min: 5 }).withMessage("New password Must be 5 charts")
    ,
    body('confirmPass')
        .isLength({ min: 5 }).withMessage("Must be 5 charts")
        .custom((confirmPass, {req}) => {
            if(confirmPass !== req.body.newPassword) {
                throw new Error("Password did't match")
            }
            return true;
        })
]

module.exports = { signupValidator, loginValidator, changePasswordValidator};

const { getLogin, postLogin, getRegister, postRegister, logOut, isLogin, isAuthenticated, getChangePassword, postChangePassword } = require("../controllers/authController");
const { signupValidator, loginValidator, changePasswordValidator } = require("../validator/authValidator");

const router = require("express").Router()


router.get("/login", isLogin, getLogin)
router.get("/register", isLogin, getRegister)

router.post("/login", isLogin, loginValidator, postLogin)
router.post("/register", isLogin, signupValidator, postRegister)

router.get("/change-password", isAuthenticated, getChangePassword)
router.post("/change-password", isAuthenticated, changePasswordValidator, postChangePassword)

router.get("/logout", logOut)


module.exports = router; 
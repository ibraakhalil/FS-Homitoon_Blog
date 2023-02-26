const router = require("express").Router()
const upload = require("../middlewares/upload")
const { getProfile, getEditProfile, postEditProfile, isAuthenticate, profileAuthentication } = require("../controllers/profileController")
const { editProfileValidator } = require("../validator/editProfileValidator")


router.get("/", isAuthenticate, profileAuthentication, getProfile)


router.get("/edit-profile", isAuthenticate, getEditProfile)
router.post("/edit-profile", isAuthenticate, upload.single("profilePic"), editProfileValidator, postEditProfile)

module.exports = router;
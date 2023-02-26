const router = require("express").Router()
const { getAuthor } = require("../controllers/authorController")



router.get("/:userId", getAuthor)



module.exports = router;
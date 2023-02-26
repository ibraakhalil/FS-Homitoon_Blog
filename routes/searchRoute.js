const router = require("express").Router()
const { searchResultController } = require("../controllers/searchController")


router.get('/', searchResultController)

module.exports = router
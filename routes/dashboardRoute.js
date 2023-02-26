const router = require("express").Router()
const { getDashboard } = require("../controllers/dashboardController")
const { isAuthenticated } = require("../controllers/authController")


router.get("/", isAuthenticated, getDashboard)


module.exports = router
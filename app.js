require("dotenv").config()
require("./config/database")
const express = require("express")
const middleware = require("./middlewares/middleware")
const router = require("./routes/router")
const app = express()
const port = process.env.PORT || 5500


app.set("view engine", "ejs")
app.set("views", "views")

app.use(middleware)
app.use(router) 


app.listen(port, () => {
    console.log("Server running successfully http://localhost:"+ port);
})
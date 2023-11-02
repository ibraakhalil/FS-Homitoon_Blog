require("dotenv").config()
require("./config/database")
const express = require("express")
const middleware = require("./middlewares/middleware")
const router = require("./routes/router")
const app = express()
const port = process.env.PORT || 5500
const path = require('path')


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);

app.use(middleware)
app.use(router) 


app.listen(port, () => {
    console.log("Server running successfully http://localhost:"+ port);
})
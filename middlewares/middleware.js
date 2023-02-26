require("dotenv").config()
const express = require("express")
const flash = require("connect-flash")
const setLocals = require("./setLocals")
const bindUserWithReq = require("./bindUserWithReq")
const cors = require("cors")
const session = require("express-session")
const mongoDBStore = require("connect-mongodb-session")(session)
const store = new mongoDBStore({
    uri: process.env.DB_URL,
    collection: "session",
    expires: 1000 * 60 * 60 * 60
})

const middleware = [
    express.urlencoded({extended:true}),
    express.json(),
    express.static('public'),
    cors(),
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    }),
    bindUserWithReq(),
    setLocals,
    flash()
]



module.exports = middleware
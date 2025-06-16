const path = require("path")

const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const debug = require("debug")("short-link")

//loding config
dotenv.config({path: "./config/config.env"})

//connect db
require("./config/db")

const app = express()

//midd
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended: false}))

//logget (winston)
const logger = require("./config/winston")

//morgan
if(process.env.NODE_ENV == "development"){ 
    app.use(morgan("combined", {
        stream: logger.stream
    }))
}

//set view engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

//routes
app.use(require("./routes/routes"))

const port = process.env.PORT || 3000
app.listen(port, (err) => {
    if(err) console.log(err)
    else debug("start :)")
})
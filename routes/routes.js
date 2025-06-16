const { Router } = require("express");

const controller = require("../controllers/indexController")

const router = Router();

//index
router.get("/", controller.index)

//short URL
router.post("/", controller.shortURL)

//sender
router.get("/u/:id", controller.sender)

module.exports = router
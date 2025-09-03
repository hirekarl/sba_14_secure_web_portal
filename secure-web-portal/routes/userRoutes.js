const express = require("express")
const router = express.Router()

const passport = require("passport")

const { register, login, authenticate, callback } = require("../controllers/userController")

router.post("/register", register)
router.post("/login", login)

router.get("/auth/github", passport.authenticate("github"), authenticate)
router.get("/auth/github/callback", callback)

module.exports = router

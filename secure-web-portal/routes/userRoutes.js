const express = require("express")
const router = express.Router()

const passport = require("passport")

const { register, login, callback } = require("../controllers/userController")

router.post("/register", register)
router.post("/login", login)

router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }))
router.get("/auth/github/callback", passport.authenticate("github"), callback)

module.exports = router

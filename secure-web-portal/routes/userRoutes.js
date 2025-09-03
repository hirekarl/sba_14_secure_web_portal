const express = require("express")
const router = express.Router()

const { register, login, authenticate, callback } = require("../controllers/userController")

router.post("/register", register)
router.post("/login", login)

router.get("/auth/github", authenticate)
router.get("/auth/github/callback", callback)

module.exports = router

const express = require("express")
const router = express.Router()

const { register, login, authenticate, callback } = require("../controllers/userController")

router.post("/register", register)
router.post("/login", login)

router.get("/auth/github")
router.get("/auth/github/callback")

module.exports = router

const jwt = require("jsonwebtoken")
const passport = require("passport")

const { JWT_SECRET, JWT_EXPIRY } = require("../utils")

const User = require("../models/User")

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const foundUser = await User.findOne({ email: email })

    if (foundUser) {
      res
        .status(409)
        .json({ error: `User with email ${email} already exists.` })
    } else {
      const newUser = await User.create({
        username: username,
        email: email,
        password: password,
      })

      const token = jwt.sign({ data: newUser }, JWT_SECRET, {
        expiresIn: JWT_EXPIRY,
      })

      res.status(201).json({ user: newUser, token })
    }
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const foundUser = await User.findOne({ email: email })

    if (!foundUser) {
      return res.status(401).json({ error: "Incorrect email or password." })
    }

    const passwordIsCorrect = await foundUser.checkPassword(password)

    if (!passwordIsCorrect) {
      return res.status(401).json({ error: "Incorrect email or password." })
    }

    const payload = {
      _id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
    }

    const token = jwt.sign({ data: payload }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    })

    res.json({ token: token, user: foundUser })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message })
  }
}

const authenticate = () => {
  passport.authenticate("github", { scope: ["user:email"] })
}

const callback = async () => {
  passport.authenticate("github", {
    failureRedirect: "/login",
  }),
    async (req, res) => {
      try {
        const user = await User.findOne({ email: req.user.email })

        jwt.sign(
          {
            data: user,
          },
          JWT_SECRET,
          { expiresIn: JWT_EXPIRY },
          (error, token) => {
            if (error) throw error
            res.redirect(`/api/bookmarks?token=${token}`)
          }
        )
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: "There was a problem logging you in." })
      }
    }
}

module.exports = { register, login, authenticate, callback }

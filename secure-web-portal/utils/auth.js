const jwt = require("jsonwebtoken")

const Bookmark = require("../models/Bookmark")

const { JWT_SECRET, JWT_EXPIRY } = require("./index")

const authMiddleware = (req, res, next) => {
  let token = req.query.token || req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: "Missing or invalid token." })
  }

  token = token.split(" ").pop().trim()

  try {
    const { data } = jwt.verify(token, JWT_SECRET, { maxAge: JWT_EXPIRY })
    req.user = data
  } catch (error) {
    console.error("Invalid token:", error)
    return res.status(401).json({ message: "Missing or invalid token." })
  }

  next()
}

const userOwnsBookmark = async (req, res, next) => {
  const token = req.query.token

  if (!token) {
    return res.status(401).json({ message: "Missing or invalid token." })
  }

  const bookmarkId = req.params.id

  if (!bookmarkId) {
    return res.status(400).json({ message: "Missing bookmark ID." })
  }

  const foundBookmark = await Bookmark.findById(bookmarkId)

  if (!foundBookmark) {
    return res.status(404).json({ message: "Bookmark not found." })
  }

  if (String(foundBookmark.user) !== String(req.user._id)) {
    return res
      .status(403)
      .json({
        message: "You are not authorized to access or modify this bookmark.",
      })
  }

  next()
}

module.exports = { authMiddleware, userOwnsBookmark }

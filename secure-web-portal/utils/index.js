const path = require("path")
require("dotenv").config(path.resolve(__dirname, "../.env"))

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRY = "2h"
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL

module.exports = {
  MONGO_URI,
  PORT,
  JWT_SECRET,
  JWT_EXPIRY,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,
}

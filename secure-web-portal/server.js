const express = require("express")

const connect = require("./config/connection")

const session = require("express-session")
require("./config/passport")
const passport = require("passport")

const userRoutes = require("./routes/userRoutes")
const bookmarkRoutes = require("./routes/bookmarkRoutes")

const { PORT, GITHUB_CLIENT_SECRET } = require("./utils")

const run = async () => {
  await connect()

  const app = express()

  app.use(
    session({
      secret: GITHUB_CLIENT_SECRET,
      resave: false,
      saveUninitialized: false
    })
  )

  app.use(passport.session())
  app.use(passport.initialize())

  app.use(express.json())

  app.use("/api/users", userRoutes)
  app.use("/api/bookmarks", bookmarkRoutes)

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}.`)
  })
}

run()

const express = require("express")

const connect = require("./config/connection")

const userRoutes = require("./routes/userRoutes")
const bookmarkRoutes = require("./routes/bookmarkRoutes")

const { PORT } = require("./utils")

const run = async () => {
  await connect()

  const app = express()

  app.use(express.json())

  app.use("/api/users", userRoutes)
  app.use("/api/bookmarks", bookmarkRoutes)

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}.`)
  })
}

run()

const passport = require("passport")
const GitHubStrategy = require("passport-github2").Strategy
const User = require("../models/User")

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,
} = require("../utils")

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL,
      scope: ["user:email"],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ githubId: profile.id })

        if (existingUser) {
          return done(null, existingUser)
        }

        const newUser = await User.create({
          githubId: profile.id,
          username: profile.username,
          email: profile.emails[0].value,
        })

        done(null, newUser)
      } catch (error) {
        done(error, false)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    return done(null, user)
  } catch (error) {
    return done(error, false)
  }
})

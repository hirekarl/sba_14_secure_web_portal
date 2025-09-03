const mongoose = require("mongoose")
const { Schema, model } = mongoose

const bcrypt = require("bcrypt")

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
      unique: true,
      trim: true,
    },
    githubId: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 8,
    },
  },
  {
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.password
        delete ret.githubId
        delete ret.__v
        return ret
      },
    },
  }
)

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10
    this.password = await bcrypt.hash(this.password, saltRounds)
  }

  next()
})

userSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

mongoose.set("runValidators", true)

const User = model("User", userSchema)

module.exports = User

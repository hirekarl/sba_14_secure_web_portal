const mongoose = require("mongoose")
const { Schema, model } = mongoose

const bookmarkSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.__v
        return ret
      },
    },
  }
)

mongoose.set("runValidators", true)

const Bookmark = model("Bookmark", bookmarkSchema)

module.exports = Bookmark

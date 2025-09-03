const express = require("express")
const router = express.Router()

const { authMiddleware, userOwnsBookmark } = require("../utils/auth")

const {
  createBookmark,
  getAllBookmarks,
  getBookmarkById,
  updateBookmark,
  deleteBookmark,
} = require("../controllers/bookmarkController")

router.get("/", authMiddleware, getAllBookmarks)
router.post("/", authMiddleware, createBookmark)
router.get("/:id", authMiddleware, userOwnsBookmark, getBookmarkById)
router.put("/:id", authMiddleware, userOwnsBookmark, updateBookmark)
router.delete("/:id", authMiddleware, userOwnsBookmark, deleteBookmark)

module.exports = router

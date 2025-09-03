const Bookmark = require("../models/Bookmark")

const createBookmark = async (req, res) => {
  try {
    const userId = req.user._id

    const newBookmark = await Bookmark.create({
      ...req.body,
      user: userId,
    })

    res.status(201).json(newBookmark)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "There was a problem." })
  }
}

const getAllBookmarks = async (req, res) => {
  try {
    const userId = req.user._id

    const allBookmarks = await Bookmark.find({ user: userId })

    res.status(200).json(allBookmarks)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "There was a problem." })
  }
}

const getBookmarkById = async (req, res) => {
  try {
    const bookmarkId = req.params.id

    const foundBookmark = await Bookmark.findById(bookmarkId)

    if (!foundBookmark) {
      return res.status(404).json({ message: "Couldn't find bookmark." })
    }

    res.status(200).json(foundBookmark)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "There was a problem." })
  }
}

const updateBookmark = async (req, res) => {
  try {
    const bookmarkId = req.params.id

    const foundBookmark = await Bookmark.findById(bookmarkId)

    if (!foundBookmark) {
      return res.status(404).json({ message: "Couldn't find bookmark." })
    }

    const updatedBookmark = await Bookmark.findByIdAndUpdate(
      foundBookmark._id,
      req.body,
      { new: true }
    )

    res.status(200).json(updatedBookmark)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "There was a problem." })
  }
}

const deleteBookmark = async (req, res) => {
  try {
    const bookmarkId = req.params.id

    const foundBookmark = Bookmark.findById(bookmarkId)

    if (!foundBookmark) {
      return res.status(404).json({ message: "Couldn't find bookmark." })
    }

    await Bookmark.findByIdAndDelete(foundBookmark._id)

    res.status(200).json({ message: "Bookmark deleted." })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "There was a problem." })
  }
}

module.exports = {
  createBookmark,
  getAllBookmarks,
  getBookmarkById,
  updateBookmark,
  deleteBookmark,
}

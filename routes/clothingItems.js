const router = require("express").Router();

const {
  addItem,
  getItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// CRUD

// Create

router.post("/", addItem);

// READ

router.get("/", getItem);

// DELETE

router.delete("/:itemId", deleteItem);

// LIKE

router.put("/:itemId/likes", likeItem);

// DISLIKE

router.delete("/:itemId/likes", dislikeItem);

module.exports = router;

const router = require("express").Router();

const {
  addItem,
  getItem,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
//crud

//create
router.post("/", addItem);

//read

router.get("/", getItem);

//update

/*router.put("/:itemId", updateItem); */
//delete

router.delete("/:itemId", deleteItem);

// Like Item
router.put("/:itemId/likes", likeItem);

// Dislike Item
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;

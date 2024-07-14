const router = require("express").Router();

const {
  addItem,
  getItem,
  updateItem,
  deleteItem,
} = require("../controllers/clothingItems");
//crud

//create
router.post("/", addItem);

//read

router.get("/", getItem);

//update

router.put("/:itemId", updateItem);
//delete

router.delete("/:itemId", deleteItem);

module.exports = router;

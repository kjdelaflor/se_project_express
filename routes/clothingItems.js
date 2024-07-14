const router = require("express").Router();

const { addItem } = require("../controllers/clothingItems");

router.post("/", addItem);

module.exports = router;

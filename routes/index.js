const router = require("express").Router();

const itemsRouter = require("./clothingItems");

router.use("/items", itemsRouter);

router.use((req, res) => {
  res.status(documentNotFound).send({ message: "Router not found" });
});

module.exports = router;

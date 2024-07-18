const router = require("express").Router();

const userRouter = require("./users");

const clothingItem = require("./clothingItems");

const { NOT_FOUND, messageNotFoundError } = require("../utils/errors");

router.use("/users", userRouter);

router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});

module.exports = router;

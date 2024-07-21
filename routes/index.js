const router = require("express").Router();

const userRouter = require("./users");

const clothingItem = require("./clothingItems");

const { NOT_FOUND, messageNotFoundError } = require("../utils/errors");

router.use("/users", userRouter);

router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: messageNotFoundError });
});

module.exports = router;

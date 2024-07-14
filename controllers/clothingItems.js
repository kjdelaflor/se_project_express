const ClothingItem = require("../models/clothingItem");

const addItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(invalid400).send({ message: "Invalid data" });
      }
      return res
        .status(defaultError)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = { addItem };

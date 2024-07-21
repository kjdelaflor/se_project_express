const ClothingItem = require("../models/clothingItem");

const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  messageBadRequest,
  messageInternalServerError,
  messageNotFoundError,
} = require("../utils/errors");

const addItem = (req, res) => {
  console.log(req);
  console.log(req.body);
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: `${messageBadRequest} from createItem` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `${messageInternalServerError} from createItem` });
    });
};

const getItem = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(OK).send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .send({ message: "An error has occurred on the server." });
    });
};

/* const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => res.status(OK).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: `${messageBadRequest} from updateItem` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `${messageInternalServerError} from updateItem` });
    });
}; */

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(OK).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError" || err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: `${messageBadRequest} from deleteItem` });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: `${messageNotFoundError} from deleteItem` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `${messageInternalServerError} from deleteItem` });
    });
};

const likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(OK).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: `${messageBadRequest} from likeItem` });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: `${messageNotFoundError} from likeItem` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `${messageInternalServerError} from likeItem` });
    });

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(OK).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: `${messageBadRequest} from dislikeItem` });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: `${messageNotFoundError} from dislikeItem` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `${messageInternalServerError} from dislikeItem` });
    });

module.exports = {
  addItem,
  getItem,
  /* updateItem, */
  deleteItem,
  likeItem,
  ClothingItem,
  dislikeItem,
};

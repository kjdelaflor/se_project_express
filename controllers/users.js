const User = require("../models/user");
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  messageBadRequest,
  messageInternalServerError,
  messageNotFoundError,
} = require("../utils/errors");

const createUser = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        console.error(err);
        return res
          .status(BAD_REQUEST)
          .send({ message: `${messageBadRequest} createUser` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `${messageInternalServerError} from createUser` });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((items) => res.status(OK).send(items))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: `${messageBadRequest} from getUsers` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `${messageInternalServerError} from getUsers` });
    });
};
// getUserId

const getUserId = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((item) => res.status(OK).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: `${messageBadRequest}from getUserId ` });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: `${messageNotFoundError} from getUserId` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `${messageInternalServerError} from getUserId` });
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserId,
};

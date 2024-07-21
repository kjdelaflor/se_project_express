const { Router } = require("express");

const router = Router();

const { createUser, getUsers, getUserId } = require("../controllers/users");

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:userId", getUserId);

module.exports = router;

const { Router } = require("express");

const router = Router();

const { createUser, getUsers, getUserId } = require("../controllers/users");

router.get("/", () => console.log("GET users"));
router.get("/:userId", () => console.log("GET users by _id"));
router.post("/", () => console.log("POST users"));

module.exports = router;

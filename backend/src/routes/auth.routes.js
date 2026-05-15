// const express = require("express");
// const routes = express.Router();

// const conreoller = require("../controllers/auth.controller");

const router = require("express").Router();
const authController = require("../controllers/auth.controller")

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;

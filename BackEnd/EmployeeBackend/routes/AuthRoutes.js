const express = require("express");
const controller = require("../controller/AuthController");

const authRouter = express.Router();

authRouter.post("/login", controller.loginApi);

authRouter.post("/auth", controller.registerApi);

module.exports = authRouter;

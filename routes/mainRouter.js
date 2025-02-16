const { Router } = require("express");
const mainRouter = Router();
const userController = require("../controllers/userController");

mainRouter.get("/", userController.loadHomepage);
mainRouter.get("/register", userController.loadRegisterPage);
mainRouter.get("/login", userController.loadLoginPage);

module.exports = mainRouter;

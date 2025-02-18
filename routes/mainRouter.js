const { Router } = require("express");
const mainRouter = Router();
const userController = require("../controllers/usersController");
const messagesController = require("../controllers/messagesController");

mainRouter.get("/", (req, res) => {
    if (req.session.user) {
        return messagesController.loadMessagesAsMember(req, res);
    } else {
        return messagesController.loadMessagesAsAnon(req, res);
    }
});
mainRouter.get("/register", userController.loadRegisterPage);
mainRouter.get("/login", userController.loadLoginPage);
mainRouter.get("/logout", userController.logoutUser);


mainRouter.post("/register", userController.registerUser);
mainRouter.post("/login", userController.loginUser);

module.exports = mainRouter;

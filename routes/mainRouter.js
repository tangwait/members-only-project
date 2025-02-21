const { Router } = require("express");
const mainRouter = Router();
const userController = require("../controllers/usersController");
const messagesController = require("../controllers/messagesController");

mainRouter.get("/", (req, res) => {
    if (req.session.user && req.session.user.membership_status) {
        return messagesController.loadMessagesAsAdmin(req, res);
    } else if (req.session.user) {
        return messagesController.loadMessagesAsMember(req, res);
    } else {
        return messagesController.loadMessagesAsAnon(req, res);
    }
});

mainRouter.get("/register", userController.validateRegistration, userController.loadRegisterPage);
mainRouter.get("/login", userController.loadLoginPage);
mainRouter.get("/logout", userController.logoutUser);


mainRouter.post("/register", userController.registerUser);
mainRouter.post("/login", userController.loginUser);
mainRouter.post("/createPost", messagesController.addMessage);
mainRouter.post("/deletePost", messagesController.deleteMessage);

module.exports = mainRouter;

const queries = require("../db/queries");

async function loadMessagesAsAdmin(req, res, next) {
    try {
        const { rows } = await queries.getAllMessagesAsMember();
        console.log(rows);
        res.render("index", { 
            user: req.session.user, 
            messages: rows || []
        });
    } catch (err) {
        next(err);
    }
}

async function loadMessagesAsMember(req, res, next) {
    try {
        const { rows } = await queries.getAllMessagesAsMember();
        console.log(rows);
        res.render("index", { 
            user: req.session.user, 
            messages: rows || []
        });
    } catch (err) {
        next(err);
    }
}

async function loadMessagesAsAnon(req, res, next) {
    try {
        const { rows } = await queries.getAllMessagesAsAnon();
        console.log(rows);

        res.render("index", { 
            user: null,
            messages: rows || []
        });
    } catch (err) {
        next(err);
    }
}

async function addMessage(req, res, next) {
    try {
        const { 'title': title, 'message': text } = req.body;
        const userId = req.session.user.id;

        await queries.addMsgToDB(title, text, userId);
        res.redirect("/");
    } catch (err) {
        next (err);
    }
}

async function deleteMessage(req, res, next) {
    try {
        console.log("Received messageId:", req.body.messageId);

        const messageId = parseInt(req.body.messageId, 10); 
        if (isNaN(messageId)) {
            throw new Error("Invalid message ID");
        }

        await queries.deleteMsgFromDB(messageId);
        res.redirect("/");
    } catch (err) {
        next(err);
    }
}


module.exports = {
    loadMessagesAsAdmin,
    loadMessagesAsAnon,
    loadMessagesAsMember,
    addMessage,
    deleteMessage
};
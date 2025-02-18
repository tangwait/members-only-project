const queries = require("../db/queries");

async function loadMessagesAsMember(req, res, next) {
    try {
        const { rows } = await queries.getAllMessagesAsMember();
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
        res.render("index", { 
            user: null,
            messages: rows || []
        });
    } catch (err) {
        next(err);
    }
}


module.exports = {
    loadMessagesAsAnon,
    loadMessagesAsMember
};
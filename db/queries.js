const pool = require("./pool");

async function getAllMessagesAsMember() {
    const { rows } = await pool.query(`
        SELECT 
            users.username, 
            messages.title, 
            messages.text, 
            messages.timestamp 
        FROM messages
        INNER JOIN users 
        ON users.id = messages.user_id;
    `);
    return rows;
}

async function getAllMessagesAsAnon() {
    const { rows } = await pool.query(`
        SELECT title, text
        FROM messages
    `);
    return rows;
}




module.exports = {
    getAllMessagesAsMember,
    getAllMessagesAsAnon
};
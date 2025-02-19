const pool = require("./pool");

async function getAllMessagesAsMember() {
    const query = `
        SELECT 
            users.username, 
            messages.title, 
            messages.text, 
            messages.timestamp 
        FROM messages
        INNER JOIN users 
        ON users.id = messages.user_id;
    `;
    const { rows } = await pool.query(query);
    return { rows };
}

async function getAllMessagesAsAnon() {
    const query = `SELECT * FROM messages;`;
    const { rows } = await pool.query(query);
    return { rows };
}


async function addMsgToDB(title, text, userId) {
    const query = `
        INSERT INTO messages (title, text, user_Id)
        VALUES ($1, $2, $3)
        RETURNING id, title, text, timestamp
        `;
    await pool.query(query, [title, text, userId]);    
}


module.exports = {
    getAllMessagesAsMember,
    getAllMessagesAsAnon,
    addMsgToDB
};
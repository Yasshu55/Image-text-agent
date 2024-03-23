const pool = require('../config/dbConfig')

class User {
    static async createUser(email,username){
        const query = 'INSERT INTO users (username,email) VALUES ($1, $2) RETURNING *'
        const values = [username,email]
        try {
            const {rows} =  await pool.query(query,values);
            return rows[0];
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
}

module.exports = User;
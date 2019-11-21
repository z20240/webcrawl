const { pool } = require('../../postgresDB');

class User {

    constructor() {
        this.pool = pool;
    }

    async getAll() {
        try {
            const { rows } = await this.pool.query('select * from users');
            return rows;
        } catch (err) {
            throw new Error(`DB Querry Error: getUsers ------> ${err}`);
        }
    }

    async getUser(params) {
        try {
            let sql = 'SELECT * FROM users WHERE ' +
            Object.entries(params).map(([key], idx) => `${key} = $${idx+1}`).join(' and ');

            const { rows } = await this.pool.query(sql, Object.values(params));

            return rows[0];

        } catch (err) {
            throw new Error(`DB Querry Error: getUsers ------> ${err}`);
        }
    }
}

module.exports = new User();
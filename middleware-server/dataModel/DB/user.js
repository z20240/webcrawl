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
}

module.exports = new User();
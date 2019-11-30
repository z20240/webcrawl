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
        const values = Object.values(params);
        try {
            let sql = 'SELECT * FROM users WHERE '
                    + Object.entries(params).map(([key, ], idx) => `${key} = $${idx+1}`).join(' and ');

            const { rows } = await this.pool.query(sql, values);

            return rows[0];

        } catch (err) {

            throw new Error(`DB Querry Error: getUsers ------> ${err}`);

        }
    }

    async insertUser(params) {

        const columns = Object.keys(params);
        const args = columns.map((...[, idx]) => `$${idx+1}`);
        const values = Object.values(params);

        try {
            let sql = `INSERT INTO users (${ columns.join(',') }) VALUES (${ args.join(',') })`;

            return await this.pool.query(sql, values);

        } catch (err) {

            throw new Error(`DB insert Error: Insert User ------> ${err}`);

        }
    }

    async updateTokenWithAccountAndPwd({account, password}, token) {
        try {
            let sql = 'UPDATE users SET authtoken = $1 WHERE account = $2 AND password = $3';

            return await this.pool.query(sql, [account, password, token]);

        } catch (err) {

            throw new Error(`DB update Error: update User ------> ${err}`);

        }
    }
}

module.exports = new User();
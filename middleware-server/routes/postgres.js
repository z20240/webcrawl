const { pool } = require('../postgresDB');
const { Router } = require('express');
var router = Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
    try {
        const { rows } = await pool.query('select * from users');
        return res.json(rows);
    } catch (err) {
        return res.json({});
    }
});


router.post('/', async function (req, res, next) {
    try {
        await pool.query(
            'INSERT INTO users (account, name, password, email) values ($1, $2, $3, $4)',
            [req.body.account, req.body.name, req.body.password, req.body.email]
        );
        return res.json({status: 'success'});
    } catch (err) {
        return res.json({});
    }
});
module.exports = router;

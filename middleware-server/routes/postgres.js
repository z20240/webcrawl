const { pool } = require('../postgraphSQL');
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

module.exports = router;

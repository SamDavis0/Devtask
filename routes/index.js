const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('index', { title: 'DELLO', error: null });
});

module.exports = router;

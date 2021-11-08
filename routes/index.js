const express = require('express');
const router = express.Router();
/* GET home page. */

// router.get('/signup', function(req, res, next) {
//   res.render('signup', { title: 'Express' });
// });

router.get('/', function(req, res) {
    res.render('index', { title: 'DELLO', error: null });
});

module.exports = router;

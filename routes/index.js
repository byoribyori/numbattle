var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { name: '' });
  res.end();
});

router.post('/', (req, res, next) => {
  var name = req.body.name;
  if (!name || name === '匿名') {
    res.render('index', { name: '' });
  } else {
    res.render('index', { name: name });
  }
  res.end();
});

module.exports = router;

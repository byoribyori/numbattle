var express = require('express');
var router = express.Router();
var planjs = require('./plan');

router.get('/', function (req, res, next) {
  res.render('index', { name: '' ,plan:!!planjs.plan.length});
  res.end();
});

router.post('/', (req, res, next) => {
  var name = req.body.name;
  if (!name || name === '匿名') {
    res.render('index', { name: '' ,plan:!!planjs.plan.length});
  } else {
    res.render('index', { name: name ,plan:!!planjs.plan.length});
  }
  res.end();
});

module.exports = router;

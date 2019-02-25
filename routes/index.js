var express = require('express');
var router = express.Router();
var planjs = require('./plan')
router.get('/', function (req, res, next) {
  planjs.delete_date();
  res.render('index', { name: '', plan: !!planjs.plan.length });
  res.end();
});

router.post('/', (req, res, next) => {
  var name = req.body.name;
  planjs.delete_date();
  if (!name || name === '匿名') {
    res.render('index', { name: '', plan: !!planjs.plan.length });
  } else {
    res.render('index', { name: name, plan: !!planjs.plan.length });
  }
  res.end();
});

module.exports = router;

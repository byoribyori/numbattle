var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index',{name:''});
  res.end();
});

router.post('/',(req,res,next)=>{
  res.render('index',{name:req.body.name});
  res.end();
});

module.exports = router;

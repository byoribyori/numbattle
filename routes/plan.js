var express = require('express');
var router = express();

var plan = [];
var plan_id = 0;

router.get('/', (req, res, next) => {
  var now_japan = new Date(new Date().setHours(new Date().getHours() + 9));
  now_japan.setMinutes(new Date().getMinutes()+20);
  if (plan.length) {
    var provisional = [];
    for (var b = 0; b < plan.length; b++) {
      if (plan[b].timeLimit > now_japan) {
        provisional.push(plan[b]);
      }
    }
    plan = provisional;
  }
  res.render('plan', {
    plan: plan
  });
  res.end();
});

router.get('/create', (req, res, next) => {
  res.render('create');
});

router.post('/create', (req, res, next) => {
  var text = req.body.text;
  var user = req.body.user;
  var month = req.body.month;
  var day = req.body.day;
  var hour = req.body.hour;
  var minute = req.body.minute;
  var date = new Date(new Date().getFullYear(), Number(month) - 1, day, hour, minute);
  var date2 = new Date(new Date().getFullYear(), Number(month) - 1, day, hour, minute);
  var now_japan = new Date(new Date().setHours(new Date().getHours() + 9));
  now_japan.setMinutes(new Date().getMinutes()+20);
  date2.setDate(date2.getDate() - 8);
  if (!text || !user || !month || !day || !hour || !minute
    || date.toString() === "Invalid Date" || now_japan > date.getTime() || now_japan < date2.getTime()) {
    res.writeHead(302, {
      'Location': '/plan'
    });
    res.end();
    return;
  }
  minute = date.getMinutes();
  if ((minute + '').length === 1) minute = '0' + minute;
  plan.push({
    text: text,
    user: user,
    date: `${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}時${minute}分～`,
    comment: [],
    id: plan_id,
    timeLimit: date.setHours(date.getHours() + 1)//date.setMinutes(date.getMinutes() + 1)//
  });
  plan_id++;
  res.writeHead(302, {
    'Location': '/plan'
  });
  res.end();
});

router.get('/comment/:id', (req, res, next) => {
  var id = req.params.id;
  var result;
  for (var j = 0; j < plan.length; j++) {
    if (plan[j].id == id) {
      result = plan[j];
    }
  }
  if (result) {
    res.render('comment', {
      plan: result,
      id: id
    });
  } else {
    res.writeHead(302, {
      'Location': '/plan'
    });
    res.end();
  }
});

router.post('/comment', (req, res, next) => {
  var name = req.body.user;
  var comment = req.body.text;
  var id = req.body.id;
  if(name&&comment){
  for (var a = 0; a < plan.length; a++) {
    if (plan[a].id == id) {
      plan[a].comment.push(name);
      plan[a].comment.push(comment);
    }
  }
}
  res.writeHead(302, {
    'Location': '/plan'
  });
  res.end();
});

module.exports = router;
module.exports.plan = plan;
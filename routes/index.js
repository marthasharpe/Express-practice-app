var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Form Validation', success: false, errors: req.session.errors });
  req.session.errors = null;
});

router.get('/submit', function(req, res, next) {
  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'Invalid password').isLength({min: 4}).equals(req.body.confirmPassword);
  
  var errors = req.validationErrors();
  if(errors) {
    req.session.errors = errors;
  }
  res.redirect('/');
})

// router.get('/test/:id', function(req, res, next) {
//   res.render('test', { output: req.params.id });
// })
// router.post('/test/submit', function(req, res, next) {
//   var id = req.body.id
//   res.redirect('/test/' + id);
// })

module.exports = router;

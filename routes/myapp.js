var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myapp-db');
var User = db.get('user');




/* GET home page. */
router.get('/myapp', function(req, res, next) {
  res.render('myapp/index', { title: 'My App' });
});

router.get('/myapp/signup', function(req, res, next) {
  res.render('myapp/signup', { title: 'Sign Up' });
});

router.post('/myapp/signup', function(req, res, next){
  //@ add validation -->res.render('myapp/signup', {error: 'Invalid Email/Password'})
  User.findOne({email:req.body.email, password:req.body.password}).then(function(user){
    if (user === ''){
      res.render('myapp/signup', {error: 'Email / Password cannot be blank'})
    } 
    if (user){
      res.render('myapp/signup', {error: 'Invalid Email/Password'})
    } 
    User.insert({email:req.body.email, password:req.body.password}).then(function(user){
      if (user) {
          // set user data in cookie 
        res.cookie('userData', user)
        res.redirect('/myapp/signin')
      } else {       
          res.render('myapp/signup', {error: 'Invalid Email/Password'})
        } 
    })
  })
})



router.post('/myapp/signin', function(req, res, next){
  User.findOne({email:req.body.email, password:req.body.password}).then(function(user){
  console.log("here")
    if (user) {
      // signin user with cookie
        res.cookie('userData', user)
        res.redirect('/myapp/dash')
      } else {
          res.render('myapp/signin', {error: 'Invalid Email/Password'})
        } 
      res.redirect('/signin')
    }
  )
})

router.get('/myapp/signin', function(req, res, next) {
  res.render('myapp/signin', { title: 'Sign In' });
});

router.get('/myapp/dash', function(req, res, next){

    // req.cookies.userData.email
    console.log(req.cookies)
  res.render('myapp/dash', {title: 'Dashboard', email:req.cookies.userData.email })
});

router.post('/myapp/logout', function(req, res, next){
  res.clearCookie('userData')
  res.redirect('/myapp/signin')
})

module.exports = router;



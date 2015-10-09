var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myapp-db');
var User = db.get('user');
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/myapp', function(req, res, next) {
  res.render('myapp/index', { title: 'My App' });
});

router.get('/myapp/signup', function(req, res, next) {
  res.render('myapp/signup', { title: 'Sign Up' });
});

router.post('/myapp/signup', function(req, res, next){
    var hash = bcrypt.hashSync(req.body.password, 8)
  //@ add validation -->res.render('myapp/signup', {error: 'Invalid Email/Password'})
  User.findOne({email:req.body.email, password:req.body.password}).then(function(user){
    if (user === ''){
      res.render('myapp/signup', {error: 'Email / Password cannot be blank'})
    } 
    if (user){
      res.render('myapp/signup', {error: 'Invalid Email/Password'})
    } else {
      User.insert({email:req.body.email, password: hash }).then(function(user){
        res.redirect('/myapp/signin')
      })
    }    
  })
})

router.post('/myapp/signin', function(req, res, next){
  User.findOne({email:req.body.email}).then(function(user){
  console.log("here")
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)){
        req.session.user = user

        console.log('NOW HEER')
      // signin user with cookie
        // res.cookie('userData', user)
        res.redirect('/myapp/dash', {userData: req.session.user})
      } else {
          res.render('myapp/signin', {error: 'Invalid Email/Password'})
        } 
    }
  })
})

router.get('/myapp/signin', function(req, res, next) {
  res.render('myapp/signin', { title: 'Sign In' });
});

router.get('/myapp/dash', function(req, res, next){
   res.render('myapp/dash', {title: 'Dashboard', userEmail: req.session.user.email })
});

router.post('/myapp/logout', function(req, res, next){
  res.clearCookie('userData')
  res.redirect('/myapp/signin')
})

module.exports = router;



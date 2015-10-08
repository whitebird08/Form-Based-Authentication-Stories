// var express = require('express');
// var router = express.Router();
// var db = require('monk')('localhost/myapp-db');
// var User = db.get('user');
// var bcrypt = require('bcrypt');


// router.post('/myapp/signin', function(req, res, next){
//   userCollection.findOne({email:req.params.email}).then(function(user){
//     if (user) {
//       var hash = bcrypt.hashSync(req.body.password, 8)
//       if (bcrypt.compareSync(hash, user.password)){
//         req.session.user = user
//         res.redirect('/myapp/dash')
//       } else {
//           res.render('myapp/signin', error: 'Invalid Email/Password')
//         } 
//       res.redirect('/myapp/signin')
//     }
//   })
// })
var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')
var userHelper = require('../helpers/user-helpers');


// Home page route


router.get('/home', function (req, res, next) {


  if (req.session.loggedIn) {

    let user = req.session.user;

    console.log(user);

    productHelper.getAllProducts().then((products) => {
      res.render('index', { products, user })
    });

  } else {

    res.redirect('/')

  }


});



// Login page route


router.get('/', (req, res, next) => {


  if (req.session.loggedIn) {
    res.redirect('/home');
  }

  res.render('user/login', { authenticated: true })

});


// Signup page route


router.get('/signup', (req, res, next) => {
  res.render('user/signup')
})

router.post('/signup', (req, res, next) => {

  userHelper.doSignUp(req.body).then((response) => {
    console.log("user data inserted " + response);
    res.redirect('/')
  })

})


// Login validation page route


router.post('/login', (req, res, next) => {
  userHelper.doLogin(req.body).then((response) => {

    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect('/')
    } else {
      res.render('user/login', { authenticated: false })
    }
  })

});


// Logout page route


router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/')
});





router.get('/data', (req, res, next) => {

  let val = req.session.loggedIn;

  res.json({ "login": val });
  res.end();

})




module.exports = router;

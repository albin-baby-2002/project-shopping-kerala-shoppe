var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function (req, res, next) {

  productHelper.getAllProducts().then((products) => {
    res.render('admin/view-products', { products, admin: true })
  })




});

router.get('/add-products', (req, res, next) => {

  res.render('admin/add-products')

})

router.post('/add-products', (req, res, next) => {

  productHelper.addProduct(req.body, (id) => {

    let Image = req.files.image;

    console.log(id);

    Image.mv('./public/product-images/' + id + '.png', (err, done) => {
      if (!err) {
        res.render("admin/add-products")
      } else {
        res.send("error")
      }
    })

  })



})

module.exports = router;

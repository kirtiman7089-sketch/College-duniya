const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middelware');
const Product = require('../Models/Product');
const User = require('../Models/User');


router.get('/user/cart',isLoggedIn, async(req,res)=>{
   let user =  await User.findById(req.user._id).populate('cart');
   res.render('cart/cart', {user});
})



// actually add the product to the cart
router.post('/user/:productId/add', isLoggedIn,async(req,res)=>{
   let {productId} = req.params;
   let userId = req.user._id; 
   let product = await Product.findById(productId);
   let user = await User.findById(userId);
   user.cart.push(product);
   await user.save();
   res.redirect('/user/cart'); 
})

router.delete('/cart/:id', isLoggedIn, async (req, res) => {
   try {
       const { id } = req.params;
       const user = await User.findById(req.user._id);

       // Find the index of the item in the cart array
       const index = user.cart.findIndex(item => item._id.toString() === id);

       if (index !== -1) {
           // Remove the item from the cart array
           user.cart.splice(index, 1);
           await user.save();
           req.flash('success', 'Product Deleted Successfully');
           res.redirect('/user/cart');
       } else {
           req.flash('error', 'Item not found in cart');
           res.redirect('/user/cart');
       }
   } catch (err) {
       console.error('Error deleting product:', err);
       req.flash('error', 'Something went wrong');
       res.redirect('/user/cart');
   }
});


module.exports = router;
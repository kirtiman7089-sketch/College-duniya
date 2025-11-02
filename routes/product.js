const express = require('express');
const Product = require('../Models/Product');
const Review = require('../Models/Review');
const User = require('../Models/User');
const router  = express.Router() //mini instance
const {validateProduct,isLoggedIn,isSeller,isProductAuthor } = require('../middelware');

router.get('/products',isLoggedIn,async (req,res)=>{
    let products = await Product.find({});
    res.render('products/index',{products});
})

router.get('/products/new', (req,res)=>{
    res.render('products/New');
})


router.get('/chat',isLoggedIn ,async (req,res)=>{
    // console.log(req.user.username);
    res.render('products/chat',{user:req.user.username});
})

router.get('/About',isLoggedIn, async(req,res)=>{
    res.render('cart/About');
 })

// to actually add the product
router.post('/products',isLoggedIn,isSeller, async (req,res)=>{
    let {name,img,price,desc} = req.body;
   await Product.create({name,img,price,desc,author:req.user._id});
   req.flash('success','Product added Successfully');
//    res.send("Succesfull submitted");
   console.log(req.body);
    res.redirect('/products');
})

router.get('/products/:id',isLoggedIn,async (req,res)=>{
   let {id} = req.params;
   let foundProduct = await Product.findById(id).populate('reviews');
   const author = await User.findById(foundProduct.author.toString());
    //   console.log(foundProduct.author.toString());
    //   console.log(author);
   res.render('products/show',{author,foundProduct, msg:req.flash('msg')});
})


// form to edit the product
router.get('/products/:id/edit',isLoggedIn,isProductAuthor,async(req,res)=>{
    let {id} = req.params;
    let foundProduct = await Product.findById(id);
    res.render('products/edit',{foundProduct});
})


router.patch('/products/:id',isLoggedIn,async(req,res)=>{
    let {id} = req.params;
    let {name,img,price,desc} = req.body;
    await Product.findByIdAndUpdate(id,{name,img,price,desc});
    req.flash('success','Product Edited Successfully');
    res.redirect(`/products/${id}`);
})

router.delete('/products/:id',isLoggedIn,isProductAuthor,async(req,res)=>{
    let {id} = req.params;
    // for(let id of prodduct.reviews){
    //      await Review.findByIdAndDelete(id);
    // }
    await Product.findByIdAndDelete(id);
    req.flash('success','Product Deleted Successfully');
    res.redirect('/products');
})

module.exports = router;

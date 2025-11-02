const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');
const Review = require('../Models/Review');
const {validateReview} = require('../middelware');


router.post('/products/:id/review', async(req,res)=>{
    try{
        let {id} = req.params;
        let {rating,comment} = req.body;
        const product = await Product.findById(id);
        const review = new Review({rating,comment});
     
        product.reviews.push(review);
        await review.save();
        await product.save();
        req.flash('success', 'Review added Successfully');
        res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500);
    }
    
})

module.exports = router;
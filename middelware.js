const Product = require('./Models/Product.js');
const {productSchema,reviewSchema} = require('./Schema.js');
const validateProduct = (req,res)=>{
 let {name,img,price,desc} = req.body;
 const {error} = productSchema.validate(name,img,price,desc);
 if(error){
    return;
 }
 next();
}

const validateReview = (req,res)=>{
    let {rating,comment} = req.body;
    const {error} = productSchema.validate(rating,comment);
    if(error){
       return;
    }
    next();
}

const isLoggedIn = (req,res,next)=>{
   if(!req.isAuthenticated()){ 
      req.flash('error','please login first');
      return res.redirect('/login');
   }
   next();
};

const isSeller = (req,res,next)=>{
  if(!req.user.role){
   req.flash('error','you dont have the permission to do that');
   return res.redirect('/products');
  }
  else if(req.user.role !== 'Seller'){
   req.flash('error','you dont have the permission to do that');
   return res.redirect('/products');
  }
  next();
}

const isProductAuthor = async (req,res,next)=>{
   let {id} = req.params;
   let product = await Product.findById(id);
   if(!product.author.equals(req.user._id)){
      req.flash('error','you are not the authorize user');
      return res.redirect('/products');
   }
   next();

}
const name = async (req,res,next)=>{
   return req.user.username;
}

module.exports = {isProductAuthor,isSeller,isLoggedIn,validateProduct,validateReview,name};
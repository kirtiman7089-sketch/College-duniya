const mongoose = require('mongoose');
const Review = require('./Review');

const productSchema = new mongoose.Schema({
     name:{
        type:String,
        trim:true,
        required:true
     },
     img: [{
      type: String,
      trim: true
    }],
     price:{
        type:Number,
        min:0,
        required:true
     },
     desc:{
        type:String,
        trim:true
     },
     reviews:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref: 'Review'
      }
     ],
     author:{
      type:mongoose.Schema.Types.ObjectId,
      ref: 'User'
     }

});

// middelware jo behind the scene monogdb operation par use hote hai and iske andar pre and post middelware hote hai which are basicaly used over the schema 


productSchema.post('findOneAndDelete',async function(product){
   if(product.reviews.length>0){
    await  Review.deleteMany({_id:{$in:product.reviews}});
   }
})


const Product = mongoose.model('Product',productSchema);

module.exports = Product;



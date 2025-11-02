const { required, number } = require('joi');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    role:{
      type:String,
      required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    Roll:{
        type:Number,
        trim:true,
        required:true
    },
    Mobile:{
        type:Number,
        trim:true,
        required:true
    },
    cart:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }
]

})

// userSchema.post('findOneAndDelete', async function(doc) {
//     if (doc && doc.cart.length > 0) {
//         try {
//             const User = mongoose.model('User'); // Requiring the model here to prevent circular dependency issues
//             await User.updateMany(
//                 { cart: { $in: doc.cart } },
//                 { $pull: { cart: { $in: doc.cart } } }
//             );
//         } catch (error) {
//             console.error('Error removing deleted product from user carts:', error);
//         }
//     }
// });
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User',userSchema);

module.exports = User;
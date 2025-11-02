const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const passport = require('passport');

router.get('/register',(req,res)=>{
    res.render('auth/signup');
})

router.post('/register', async (req,res)=>{
    let {role,Roll,Mobile,email,password,username} = req.body;
    const user = new User({role,Roll,Mobile,email,username});
   const newUser =  await User.register(user,password);
//    res.redirect('/login') ;
      req.login(newUser,function(err){
        if(err){
            return next(err);
        }
        req.flash('success','welcome, you are register successfully');
        return res.redirect('/products');
      });
})

// to get login Form

router.get('/login',(req,res)=>{
    res.render('auth/login');
})

// to actually login via the db
router.post('/login',
  passport.authenticate('local', { 
    failureRedirect: '/login', 
    failureMessage: true 
}),
(req,res)=>{
  req.flash('success','welcomme Back');
  res.redirect('/products');
})
  


//   logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
  if (err) {
      return next(err);
  }
  req.flash('success', 'Goodbye friends, see you again.');
  res.redirect('/login'); 
});
});


module.exports = router;
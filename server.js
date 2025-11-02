const http = require("http");
const express = require('express');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;
const Message = require('./Models/Message'); 
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const seedDB =  require('./Seed');
const productRoutes = require('./routes/product');
const ReviewRoutes = require('./routes/review');
const methodOverride = require('method-override');
const flash =  require('connect-flash');
const User = require('./Models/User');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cartRoutes = require('./routes/cart');




let configSession = {
    secret: 'keyboard cat', 
    resave:false,
    saveUninitialized: true,
    cookie: {
        httpOnly:true,
        expires:Date.now() + 24*60*60*1000
    }
}
app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session(configSession));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


mongoose.connect('mongodb://127.0.0.1:27017/Shopping-App')
.then(()=>{
    console.log("Database Connected Successfully");
})
.catch((err)=>{
    console.log(err)
})


//Passport
passport.use(new LocalStrategy(User.authenticate()));
// Seed data into database
// seedDB();

app.use(productRoutes); // har incoming request k liye chalega
app.use(ReviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);




const io = require('socket.io')(server);
// const io = require('socket.io')(port, {
//     cors:{
//         origin:"*"
//     }
// });

var users={}; 

io.on("connection",(socket)=>{
  socket.on("new-user-joined",(username)=>{
    users[socket.id] = username;
    socket.broadcast.emit('user-connected',username);
    io.emit("user-list",users);
  });

  socket.on("disconnect",()=>{
    socket.broadcast.emit('user-disconnected',user=users[socket.id]);
    delete users[socket.id];
    io.emit("user-list",users);
  });

    // display the message
    Message.find({})
    .then(messages => {
        socket.emit('messages', messages);
    })
    .catch(error => {
        console.error('Error fetching messages:', error);
    });

    
    socket.on('message',async (data)=>{
      // new message
      const newMessage = new Message({
        user: data.user,
        content: data.msg
    });
    await newMessage.save();
        socket.broadcast.emit("message",{user:data.user,msg:data.msg});
    });
});




app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Adjust the origin based on your needs
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });




server.listen(port,()=>{
    console.log("Server Connected Successfuly");
})
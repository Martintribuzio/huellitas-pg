const userNetwork = require('express').Router();
const { createUser, postsByUser } = require('./controller');
const passport = require("passport");

userNetwork.post('/', async (req, res) => {
  try {
    const user = await createUser(req.body);
    return res.json(user);
  } catch (err) {
    return res.json(err);
  }
});

userNetwork.get('/posts', async (req, res) => {
  try {
    const { id } = req.body;
    const posts = await postsByUser(id);
    return res.json(posts);
  } catch (err) {
    return res.json(err);
  }
});

//TODO ESTO ES EL RUTEO DEL LOGIN/REGISTER
//Landing Page
userNetwork.get("/", (req,res) => {  
  res.send("Welcome")
})
//Profile home
userNetwork.get("/home", (req,res) => {  
  res.send("Welcome to home")
})

// // Login Page
userNetwork.get("/login", (req,res) => {  
  res.send("login")
 
})
userNetwork.post("/login", passport.authenticate("local-signin", {
  successRedirect: "/user/home",
  failureRedirect: "/user/login",
  passReqToCallback: true
}))

// Register Page
userNetwork.get("/signup", (req,res) => {

  res.send("signup")
})
userNetwork.post("/signup", passport.authenticate("local-signup", {
  successRedirect: "/user/login",
  failureRedirect: "/user/signup",
  passReqToCallback: true
}));

userNetwork.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

//Autenticacion para navegar entre páginas
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/user/login');
};

userNetwork.get('/profile', isLoggedIn, (req, res, next) => {
  res.render('profile') 
});

module.exports = userNetwork;

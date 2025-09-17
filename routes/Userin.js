const express = require("express");
const router = express.Router();
const User = require("../models/User.js")
const passport= require("passport");
router.get("/signup",(req,res)=>{
    res.render("Users/signup.ejs");
})
router.post("/signup",async (req,res)=>{
    const{username,password} = req.body;
    const newUser= new User({username});
     const registeredUser = await User.register(newUser,password);
     console.log(registeredUser);
     req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are registerd successfully")
     res.redirect('/listings');
})
    })
     
router.get("/login",(req,res)=>{
    res.render("Users/login.ejs");
})
router.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out successfully");
        res.redirect("/login");
    })
})
router.post("/login",passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),async (req,res)=>{
    req.flash("success","welcome to wandurlust again");
    res.redirect("/listings");
    
});
module.exports=router;
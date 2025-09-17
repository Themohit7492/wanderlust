const mongoUrl ='mongodb://127.0.0.1:27017/myhotellist';
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");

const localStrategy = require("passport-local");
const User = require("./models/User.js")

const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");
const Userin = require("./routes/Userin.js");
const path= require("path");
const methodOverride =require("method-override");
const ejsMate = require("ejs-mate");
const listings = require("./routes/listing.js")
const reviews = require("./routes/review.js")
const flash = require("connect-flash");
const session = require("express-session");
main().then(()=>{
    console.log("connected to db");
}).catch((err) =>{
    console.log(err);
})

async function main(){
    await mongoose.connect(mongoUrl);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);

const sessionOptions={
    secret:"mesupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+ 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
} 
app.get("/",(req,res)=>{
    res.redirect("/login");
    
}); 
//using sessions and passports for password
app.use(session(sessionOptions) )
app.use(flash())
app.use(passport.initialize())
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use((req,res,next)=>{
    res.locals.success= req.flash("success");
    res.locals.error= req.flash("error");
    next();
})

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews); 
app.use("/",Userin);

app.get("/testListing",async (req,res)=>{
    let sampleListing = new Listing(
        {
            title:"my new villa",
            description:"by the beach",
            price:7000000,
            location:"greater noida",
            country:"india",
        }
    );
   await sampleListing.save();
   console.log("sample was saved");
   res.send("successful testing");
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
app.get("/demouser",async (req,res)=>{
    let fakeUser = new User({
        email:"mohitkumar@gmail.com",
        username:"Moohitsingh",
    })
    let registeredUser = await User.register(fakeUser,"helloworld");
    res.send(registeredUser);
})

app.use((err, req, res, next) => {
    console.error(" ERROR STACK:", err.stack);
    console.error(" ERROR MESSAGE:", err.message);
    res.status(500).send("Something went wrong: " + err.message);
});


app.listen(8080, () =>{
    console.log("server is listeninig to port 8080");
}
);
const express= require("express");
const app = express();
const users = require("./routes/user.js");
const post = require("./routes/post.js")
const session = require("express-session");
const flash= require("connect-flash");
const path= require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(session({
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true
})
);

app.use(flash())
app.use((req,res,next)=>{
    res.locals.messages=req.flash("success");
     res.locals.errors=req.flash("error");
     next();
})
// app.get("/",(req,res)=>{
//     res.send("test successful")
// })
// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
    
//     }
//     else{
//         req.session.count=1;
//     }
//     res.send(`you sent a request ${req.session.count} times`);
// })
app.get("/register",(req,res)=>{
    let {name}=req.query;
    req.session.name = name;
    req.flash("success","well done");
    req.flash("error","some error occured as the user is not registered");
    res.redirect("/hello");
})

app.get("/hello",(req,res)=>{
    
    res.render("flashme.ejs",{name:req.session.name});
});
app.listen(3000,()=>{
    console.log("app is listening to port 3000");

})

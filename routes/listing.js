const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const {isLoggedIn} = require("../middleware.js")
    //new or create route
    router.get("/new" ,isLoggedIn,(req,res,)=> {
        
            res.render("listings/new.ejs");
        
    })
    router.post("/", async (req, res,) => {
        try{
   let { listing } = req.body;  
    let newListing = new Listing(listing);
    await newListing.save();
    req.flash("success","hotel added successfully");
    res.redirect("/listings"); 
        }
        catch (err){
            next(err);
        }
   
});
    //delete route
    router.delete("/:id",isLoggedIn,async (req,res)=>{
        let{id}=req.params;
        let deletedListing= await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash("success","hotel deleted successfully");
        res.redirect("/listings")
    })
   //update route
    router.put("/:id",isLoggedIn, async(req,res)=>{
        let{id}=req.params;
        await Listing.findByIdAndUpdate(id,{...req.body.listing});
          req.flash("success","hotel added successfully");
        res.redirect("/listings");
    })

//index route
router.get("/",isLoggedIn,async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
    });
    router.get("/:id/edit",async (req,res)=>{
           let{id}=req.params;
       const listing =  await Listing.findById(id);
        res.render("listings/edit.ejs",{listing});
    })
    router.get("/:id",isLoggedIn,async (req,res)=>{
        let{id}=req.params;
       const listing =  await Listing.findById(id).populate("reviews");
       if(!listing){
        req.flash("error","Hotel you requested Does not exist");
        res.redirect("/listings");
       }
       res.render("listings/show.ejs",{listing});
    })







module.exports= router;
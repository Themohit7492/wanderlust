const express = require("express")
const router = express.Router();
router.get("/",(req,res)=>{
    res.send("hi i am the user");
});
router.get("/:id",(req,res)=>{
    res.send("hi i am the userid");
});
router.post("/",(req,res)=>{
    res.send("post for users");
});
router.delete("/:id",(req,res)=>{
    res.send("delete for userid");
});
module.exports= router;
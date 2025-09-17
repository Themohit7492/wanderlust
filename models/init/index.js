const mongoose= require("mongoose");
const initData = require("./data.js");
const listing = require("../listing.js");
const mongoUrl ='mongodb://127.0.0.1:27017/myhotellist';
main().then(()=>{
    console.log("connected to db");
}).catch((err) =>{
    console.log(err);
})

async function main(){
    await mongoose.connect(mongoUrl);
}
const initDb = async()=>{
    listing.deleteMany({});
    await listing.insertMany(initData.data);
    console.log("data was initialised");
}
initDb();
const mongoose= require("mongoose");
const mongoURI="mongodb://localhost:27017/myNoteBook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const connectToDB=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to db")
    })
}

module.exports= connectToDB;
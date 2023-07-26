const mongoose= require('mongoose');
mongoose.set('strictQuery', true)

const mongoURI="mongodb://localhost:27017/hello";

const connectToMongo=()=>{
    mongoose.connect(mongoURI,
    ()=>{
        console.log("connected succesfully")
    })
}

module.exports=connectToMongo;

//To eastablish Connection

const mongoose=require('mongoose')


const connectToDb =()=>{

    
  mongoose.connect("mongodb://0.0.0.0/coreshield").then(()=>{
    console.log("Database connected")
  }).catch((err)=>{
    console.log(err)
  })
  
}



module.exports=connectToDb  

//To eastablish Connection

const mongoose=require('mongoose')

//local

// const connectToDb =()=>{

    
//   mongoose.connect("mongodb://0.0.0.0/coreshield").then(()=>{
//     console.log("Database connected")
//   }).catch((err)=>{
//     console.log(err)
//   })
  
// }

//atlas

const connectToDb =()=>{

    
  mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected")
  }).catch((err)=>{
    console.log(err)
  })
  
}



module.exports=connectToDb  

const dotenv= require('dotenv')
dotenv.config();
const express=require('express')
const app=express()
const port=process.env.PORT || 3000;









app.get("/",(req,res)=>{
    res.json("Hello PC")
})



app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
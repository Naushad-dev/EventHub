import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/connection.js"
dotenv.config()
import app from "./app.js"

// const app= express()
console.log(process.env.port)

connectDB()
.then(() => {
    app.listen(3000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.port}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})


// app.listen( 8000,()=>{
//     connectDB()
//     console.log(`Server is started on port `)
// })

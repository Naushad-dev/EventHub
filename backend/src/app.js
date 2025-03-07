import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import bodyParser from "body-parser"
const app= express()


//middleware
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())



//Routes imports
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import eventRouter  from "./routes/event.routes.js"

//Route declaration

app.use("/api/v1/user",authRouter)
app.use("/api/v1/user",userRouter)
app.use("/api/v1",eventRouter)

export default app
import express, { json } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app= express()

//middleware
app.use(cookieParser())
app.use(express.json())
app.use(cors())


//Routes imports
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"

//Route declaration

app.use("/api/v1/user",authRouter)
app.use("/api/v1/user",userRouter)

export default app
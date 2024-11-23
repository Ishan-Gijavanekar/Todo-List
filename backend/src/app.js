import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json({
    limit: "100kb"
}))
app.use(cookieParser())
app.use(express.urlencoded({limit:"100kb", extended: true}))
app.use(express.static("public"))

// imports Routes
import userRouter from "./routes/User.routes.js"
import listRouter from "./routes/Todo.routes.js"

//Routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/items", listRouter)

export {app}
import express from 'express'
import userRouter from './routes/userRoutes.js'
import connectDB from './config/connectdb.js'
import cookieParser from 'cookie-parser'
import authenticatedPostRoutes from './routes/authenticatedPostRoutes.js'
import authenticatingUser from './middlewares/authUser.js'
import commonPostRouter from './routes/commonPostRoutes.js'
const app = express()

// Middlewares
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/api/user',userRouter)
app.use('/api/post',authenticatingUser,authenticatedPostRoutes)
app.use('/api/posts',commonPostRouter)
// Server + DB setup
app.listen(5000, async ()=>{
    await connectDB()
    console.log('Server Started ...')
})
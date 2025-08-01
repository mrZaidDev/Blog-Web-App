import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
    try {
      await mongoose.connect('mongodb+srv://ZaidKhan:mcfniN2015@node-express-projects.bn0xlg9.mongodb.net/Blog?retryWrites=true&w=majority&appName=Node-Express-Projects')
      console.log('DB connected ...')
    } catch (error) {
        console.log('error occurred' + error)
        process.exit(1)
    }
}

export default connectDB

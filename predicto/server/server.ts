import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.routes'; 


mongoose.connect("mongodb+srv://basimbangalath8075:b4eVjfiTwZdwqahA@cluster11.guuvw6k.mongodb.net/")
.then(()=>(console.log("mongoDb connected")))
.catch((error)=>console.log(error));

const app=express()

const PORT=process.env.PORT || 5000

app.use(cors({
  origin : 'http://localhost:5173',
  methods : ['GET','POST','PUT','DELETE'],
  allowedHeaders : [
    "Content-Type",
    "Authorization",
    'Cache-Control',
    'Expires',
    'Pragma'
  ],
  credentials : true
} 
))

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoutes);


app.listen(PORT,()=>{console.log(`server is running on port ${PORT}`);
})


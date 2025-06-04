import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.routes'; 
import questionRoutes from './routes/question.routes';
import betRoutes from './routes/bet.routes';
import userRoutes from './routes/user.routes';
import { createServer } from 'http';
import { Server } from 'socket.io';



mongoose.connect("mongodb+srv://basimbangalath8075:b4eVjfiTwZdwqahA@cluster11.guuvw6k.mongodb.net/")
.then(()=>(console.log("mongoDb connected")))
.catch((error)=>console.log(error));

const app=express()
const httpServer = createServer(app); // Wrap Express app with HTTP server
const io = new Server(httpServer, { 
  cors: { origin: "http://localhost:5173" } // Allow React client
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


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
app.use('/api/questions', questionRoutes);
app.use('/api/bets', betRoutes);
app.use('/api/user', userRoutes);

httpServer.listen(PORT,()=>{console.log(`server is running on port ${PORT}`);
})


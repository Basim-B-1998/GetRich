
import mongoose from "mongoose"

const connectDb=async ()=>{
  try{
      await mongoose.connect(process.env.MONGO_URI,{
       useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Mongodb Connected');
  }catch(error){
    console.log("error occured while connecting to mongodb");
    process.exit(1)
    
  }
  }

export default connectDb

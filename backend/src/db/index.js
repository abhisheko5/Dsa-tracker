import mongoose from 'mongoose';

const connectDB= async()=>{
  try{

    const connectionMongo=await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(`mongodb connected successfully !! at db host:${connectionMongo.connection.host}`)

  }
  catch(error){
    console.log("mongoose connection error",error)
    process.exit(1);
  }
}
  
export{connectDB};
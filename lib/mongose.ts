import mongoose from 'mongoose';

let isConnected = false; // mongose connected variable check connected


export const ConnecteToDB = async () => {
  mongoose.set("strictQuery",true);
  if(!process.env.MONGODB_URL) return  console.log("MOngoDb Url not found ");
  if(isConnected)return console.log("this is already connected to MongoDb ");
  try {
    await mongoose.connect(process.env.MONGODB_URL)

    isConnected = true;
  } catch (error) {

    console.log(error);
  }
    
}



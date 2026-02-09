import mongoose from "mongoose"

let dbConnect =  async ()=>{
  try {
    let connent = await mongoose.connect(process.env.MONGO_DB_URI)
    console.log(`Mongo_DB is running on host : ${connent.connection.host}`);
    
  } catch (error) {
    console.log(error.message);
    process.exit(1)
  }
}
export default dbConnect
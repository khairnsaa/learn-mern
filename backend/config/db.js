import mongoose from "mongoose"

const connectDB = async () => {
    try {
        console.log('hey');
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('connected:', conn.connection.host);
    } catch (error) {
      console.log('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  };
  

export default connectDB
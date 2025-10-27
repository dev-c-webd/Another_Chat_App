import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected to host: ", connectionInstance.connection.host)
    } catch (error) {
        console.log("Error:", error);
        process.exit(1);
    }
};

export default connectDB;
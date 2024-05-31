import mongoose from "mongoose";

const connectdb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`mongoDB connected success fully !!!!! db host:${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGO DB connection error", error);
        process.exit(1);
    }
}


export default connectdb
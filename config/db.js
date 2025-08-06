import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}
async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose
            .connect(`${process.env.MONGODB_URI}/quickcart`, opts)
            .then(mongoose => {
                console.log("✅ New MongoDB connection established");
                return mongoose;
            })
            .catch((err) => {
                console.error("❌ MongoDB connection error:", err.message);
                throw err;
            });
    }
    mongoose.connection.on("connected", () => {
        console.log("✅ Mongoose is connected to MongoDB");
    });

    mongoose.connection.on("error", (err) => {
        console.error("❌ MongoDB connection error:", err);
    });

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;

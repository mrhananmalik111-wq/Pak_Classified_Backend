const mongoose = require("mongoose");

async function connecting() {
    try {
        console.log("🔄 Connecting to MongoDB...");
        
        // ✅ USE MONGODB_URI INSTEAD OF URI
        const MONGODB_URI = process.env.MONGODB_URI;
        console.log("MONGODB_URI Present:", MONGODB_URI ? "Yes" : "No");
        
        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI environment variable is missing");
        }

        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
        });
        
        console.log("✅ MongoDB Connected Successfully!");
        console.log("📊 Database Name:", mongoose.connection.name);
        console.log("🌐 Host:", mongoose.connection.host);
        
    } catch (error) {
        console.log("❌ MongoDB Connection Failed:", error.message);
        console.log("🔍 Full Error:", error);
        throw error;
    }
}

// Connection events
mongoose.connection.on('error', err => {
    console.log('❌ MongoDB Connection Error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB Disconnected');
});

mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB Connected');
});
module.exports = connecting;
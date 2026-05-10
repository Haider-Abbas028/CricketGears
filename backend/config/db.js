// This file is responsible for connecting to the MongoDB database using Mongoose. It exports a function that can be called to establish the connection when the application starts. The connection string is retrieved from environment variables for security and flexibility.
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
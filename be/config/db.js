const mongoose = require('mongoose');
require('dotenv').config();
const db = process.env.DB_KEY;

const connectDB = async () => {
try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(db, {
    useNewUrlParser: true,
    });

    console.log("Connected to MongoDB");
} catch (err) {
    console.error("1");
    process.exit(1);
}
};

module.exports = connectDB;
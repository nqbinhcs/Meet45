require('dotenv').config();
const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        const cons = await mongoose.connect(process.env.MONGO_REMOTE_URL);

        console.log('MongoDB Connected');

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


module.exports = connectDB;
const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MongoDB URI is not defined in .env');
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');
  } catch (err) {
    throw new Error(`❌ Could not connect to MongoDB: ${err}`);
  }
};

module.exports = connect;
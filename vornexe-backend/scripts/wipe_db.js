require('dotenv/config');
const mongoose = require('mongoose');
const Product = require('../models/Product.js');

const wipeDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const result = await Product.deleteMany({});
    console.log(`Deleted ${result.deletedCount} products from the database.`);

    process.exit(0);
  } catch (error) {
    console.error('Failed to wipe DB:', error);
    process.exit(1);
  }
};

wipeDb();

const mongoose = require('mongoose');
const Product = require('../models/Product');
const productsBackup = require('../../products.json');
require('dotenv').config();

async function restoreDB() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  for (const backup of productsBackup) {
    const p = await Product.findOne({ name: backup.name });
    if (p) {
      p.imageUrls = backup.imageUrls;
      await p.save();
      console.log("Restored", p.name);
    } else {
      console.log("Not found:", backup.name);
    }
  }

  console.log("Database restoration complete.");
  process.exit(0);
}

restoreDB();

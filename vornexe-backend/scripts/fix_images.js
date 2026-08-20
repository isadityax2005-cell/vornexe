require('dotenv/config');
const mongoose = require('mongoose');
const { v2: cloudinary } = require('cloudinary');
const Product = require('../models/Product.js');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const fixProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const baseDir = '/Users/adityasingh/Desktop/Thrift Pictures/Thrift New Images';
    
    // Fix Vanglocy
    const vanglocy = await Product.findOne({ name: 'Vanglocy Angel Graphic Tee' });
    if (vanglocy && vanglocy.imageUrls.length === 1) {
      const res = await cloudinary.uploader.upload(path.join(baseDir, 'IMG_4301.PNG'), { folder: 'vornexe_products' });
      vanglocy.imageUrls.push(res.secure_url);
      await vanglocy.save();
      console.log('Fixed Vanglocy');
    }

    // Fix Pink 99 Jersey
    const jersey = await Product.findOne({ name: 'Pink & White 99 Jersey' });
    if (jersey && jersey.imageUrls.length === 1) {
      const res = await cloudinary.uploader.upload(path.join(baseDir, 'IMG_4331.PNG'), { folder: 'vornexe_products' });
      jersey.imageUrls.push(res.secure_url);
      await jersey.save();
      console.log('Fixed Pink Jersey');
    }

    process.exit(0);
  } catch (error) {
    console.error('Failed:', error);
    process.exit(1);
  }
};

fixProducts();

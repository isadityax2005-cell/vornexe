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

const products = [
  { file: 'IMG_0263.jpg', name: 'Oakley Minimalist Logo Tee' },
  { file: 'IMG_0267.jpg', name: 'Thrasher Magazine Graphic Tee' },
  { file: 'IMG_0270.jpg', name: 'Ecko Unltd Graphic Tee' },
  { file: 'IMG_0276.jpg', name: 'Harley-Davidson Graphic Tee' },
  { file: 'IMG_0282.jpg', name: 'WILD Dragon Graphic Tee' },
  { file: 'IMG_0290.jpg', name: 'Off-White c/o Virgil Abloh Sneaker Longsleeve' },
  { file: 'IMG_0301.jpg', name: 'TRIBES Graphic Tee' },
  { file: 'IMG_0307.jpg', name: 'Tapout Graphic Tee' },
  { file: 'IMG_0318.jpg', name: 'Grey Distressed Skull Graphic Tee' },
  { file: 'IMG_0323.jpg', name: 'Affliction Style Skull Graphic Tee' },
  { file: 'IMG_0335.jpg', name: 'Bulzeye Live Hard Graphic Tee' },
  { file: 'IMG_0360.jpg', name: 'Harley Davidson Grey Graphic Tee' },
  { file: 'IMG_0383.jpg', name: 'Tribal Graphic Black Longsleeve' },
  { file: 'IMG_0184.jpg', name: 'MMXXIV 86 Blue Jersey' },
  { file: 'IMG_0233.jpg', name: 'Cruyff 9 FC Barcelona Jersey' },
  { file: 'IMG_0341.jpg', name: 'Flaming Skull Graphic Tee' },
  { file: 'IMG_0368.jpg', name: 'Vintage Blue Cross Hoodie' },
  { file: 'IMG_0387.jpg', name: 'Vintage T-Shirt Mystery Bundle' },
  { file: 'IMG_0251.jpg', name: 'MMXXIV 86 Blue Jersey Fit Pic' },
  { file: 'IMG_0257.jpg', name: 'Thrasher Magazine Graphic Tee Close Up' }
];

const uploadProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const baseDir = '/Users/adityasingh/Desktop/Thrift Pictures';
    
    for (let index = 0; index < products.length; index++) {
      const p = products[index];
      const filePath = path.join(baseDir, p.file);
      console.log(`Uploading ${index + 1}/${products.length}: ${p.name} (${p.file})`);
      
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'vornexe_products'
        });

        const newProduct = new Product({
          name: p.name,
          price: 399,
          description: 'Unique 1/1 vintage thrift piece. Please check size chart and measurements carefully before purchasing.',
          images: [result.secure_url],
          sizes: ['M', 'L'],
          isSoldOut: false
        });

        await newProduct.save();
        console.log(`Successfully created: ${p.name}`);
      } catch (uploadErr) {
        console.error(`Failed to upload ${p.file}:`, uploadErr.message);
      }
    }

    console.log('Finished uploading 20 products!');
    process.exit(0);
  } catch (error) {
    console.error('Script failed:', error);
    process.exit(1);
  }
};

uploadProducts();

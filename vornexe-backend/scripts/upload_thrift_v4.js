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

const productsData = [
  { files: ['IMG_4234.PNG', 'IMG_4236.PNG'], name: 'Maroon True Face Graphic Tee' },
  { files: ['IMG_4235.PNG', 'IMG_4292.PNG', 'IMG_4302.JPG', 'IMG_4303.PNG', 'IMG_4328.PNG', 'IMG_4329.PNG'], name: 'Black Flaming Skull Graphic Tee' },
  { files: ['IMG_4293.PNG', 'IMG_4294.PNG'], name: 'Red & Black Anime Button Up Shirt' },
  { files: ['IMG_4295.JPG', 'IMG_4296.PNG'], name: 'Grey Denim Jeans with Rose Embroidery' },
  { files: ['IMG_4299.PNG'], name: 'Grey Vanglocy Angel Graphic Tee' },
  { files: ['IMG_4301.PNG'], name: 'Green Live Hard BulZeye Graphic Tee' },
  { files: ['IMG_4310.PNG'], name: 'Red Stussy "It\'s a wild life" Tee' },
  { files: ['IMG_4331.PNG'], name: 'Green Tapout Graphic Tee' },
  { files: ['IMG_4322.PNG'], name: 'Grey Much More Skull & Roses Tee' },
  { files: ['render-10.jpg', 'IMG_4326.PNG'], name: 'White Off-White Arrows Tee' },
  { files: ['render-4.jpg', 'render-5.jpg', 'IMG_4332.PNG'], name: 'FC Barcelona 2009 Longsleeve Jersey' },
  { files: ['render-11.jpg', 'render-7.jpg', 'render-6.jpg'], name: 'Spiderman Costume Tee' },
  { files: ['render-13.jpg', 'render-9.jpg', 'render-8.jpg'], name: 'Seahawks 24 Lynch Jersey' },
  { files: ['render-12.jpg'], name: 'White & Pink Baseball Jersey' },
  { files: ['render-17.jpg'], name: 'White Stone Island Tee' }
];

const uploadProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Wipe existing products
    const result = await Product.deleteMany({});
    console.log(`Deleted ${result.deletedCount} old products.`);

    const baseDir = '/Users/adityasingh/Desktop/Thrift Pictures/Thrift New Images';
    
    for (let index = 0; index < productsData.length; index++) {
      const p = productsData[index];
      console.log(`Uploading ${index + 1}/${productsData.length}: ${p.name}`);
      
      const uploadedUrls = [];
      for (const file of p.files) {
        const filePath = path.join(baseDir, file);
        try {
          const res = await cloudinary.uploader.upload(filePath, {
            folder: 'vornexe_products'
          });
          uploadedUrls.push(res.secure_url);
        } catch (uploadErr) {
          console.error(`Failed to upload ${file}:`, uploadErr.message);
        }
      }

      if (uploadedUrls.length > 0) {
        const newProduct = new Product({
          name: p.name,
          price: null,
          description: 'Unique 1/1 vintage thrift piece. Please check size chart and measurements carefully before purchasing.',
          imageUrls: uploadedUrls,
          size: '',
          isSoldOut: false
        });

        await newProduct.save();
        console.log(`Successfully created: ${p.name}`);
      }
    }

    console.log('Finished uploading v4 products!');
    process.exit(0);
  } catch (error) {
    console.error('Script failed:', error);
    process.exit(1);
  }
};

uploadProducts();

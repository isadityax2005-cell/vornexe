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
  { files: ['IMG_4234.PNG', 'IMG_4235.PNG'], name: 'True Faith Maroon Graphic Tee' },
  { files: ['IMG_4236.PNG', 'IMG_4292.PNG'], name: 'True Faith Graphic Tee' },
  { files: ['IMG_4293.PNG', 'IMG_4294.PNG'], name: 'Anime Red & Black Button Up Shirt' },
  { files: ['IMG_4295.JPG', 'IMG_4296.PNG'], name: 'Grey Denim Jeans with Rose Embroidery' },
  { files: ['IMG_4299.PNG', 'IMG_4301.PNG'], name: 'Vanglocy Angel Graphic Tee' },
  { files: ['IMG_4302.JPG', 'IMG_4303.PNG'], name: 'Black Flaming Skull Graphic Tee' },
  { files: ['IMG_4310.PNG', 'IMG_4322.PNG'], name: 'Green Tapout Graphic Tee' },
  { files: ['IMG_4326.PNG', 'IMG_4328.PNG'], name: 'Off-White Cross Arrows Tee' },
  { files: ['IMG_4329.PNG', 'IMG_4331.PNG'], name: 'Pink & White 99 Jersey' },
  { files: ['IMG_4332.PNG', 'render-10.jpg'], name: 'FC Barcelona 2009 Longsleeve Jersey' },
  { files: ['render-11.jpg', 'render-12.jpg'], name: 'Spiderman Costume Tee' },
  { files: ['render-13.jpg', 'render-17.jpg'], name: 'Seahawks 24 Jersey' },
  { files: ['render-4.jpg', 'render-5.jpg'], name: 'FC Barcelona 2009 Longsleeve Jersey (Alt)' },
  { files: ['render-6.jpg', 'render-7.jpg'], name: 'Spiderman Costume Tee (Alt)' },
  { files: ['render-8.jpg', 'render-9.jpg'], name: 'Seahawks 24 Jersey (Alt)' }
];

const uploadProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const baseDir = '/Users/adityasingh/Desktop/Thrift Pictures/Thrift New Images';
    
    for (let index = 0; index < productsData.length; index++) {
      const p = productsData[index];
      console.log(`Uploading ${index + 1}/${productsData.length}: ${p.name}`);
      
      const uploadedUrls = [];
      for (const file of p.files) {
        const filePath = path.join(baseDir, file);
        try {
          const result = await cloudinary.uploader.upload(filePath, {
            folder: 'vornexe_products'
          });
          uploadedUrls.push(result.secure_url);
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

    console.log('Finished uploading products!');
    process.exit(0);
  } catch (error) {
    console.error('Script failed:', error);
    process.exit(1);
  }
};

uploadProducts();

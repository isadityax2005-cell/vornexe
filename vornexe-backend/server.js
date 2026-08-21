require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const jwt = require('jsonwebtoken');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Subscriber = require('./models/Subscriber');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'vornexe_products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif', 'mp4', 'mov']
  }
});
const upload = multer({ storage: storage });

// Configure Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Note: Nodemailer was removed because Render blocks SMTP (port 465/587).
// We use the Brevo HTTP API instead (port 443).

// --- AUTH MIDDLEWARE ---
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// --- API ROUTES ---

// Subscribe / Sign Up
app.post('/api/subscribe', async (req, res) => {
  try {
    const { name, email, phone, address, subscribe, agreePolicy } = req.body;

    // Check if user already exists
    const existingUser = await Subscriber.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'This email is already registered.' });
    }

    // Save to database
    const newSubscriber = new Subscriber({
      name,
      email,
      phone,
      address,
      subscribeToNewsletter: subscribe,
      agreedToPolicy: agreePolicy
    });
    
    await newSubscriber.save();

    // Send Welcome Email via Brevo HTTP API
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #ffffff; padding: 40px; text-align: center;">
        <h1 style="font-size: 32px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px;">VORNEXE</h1>
        <p style="font-size: 14px; letter-spacing: 1px; color: #888888; text-transform: uppercase; margin-bottom: 40px;">Account Created</p>
        
        <div style="text-align: left; margin-bottom: 30px; line-height: 1.6;">
          <p>Hi ${name},</p>
          <p>Welcome to VORNEXE. Your account has been successfully created.</p>
          <p>You will now receive updates on our exclusive 1-of-1 drops.</p>
        </div>

        <div style="background-color: #111111; padding: 20px; text-align: left; border-left: 4px solid #ffffff; margin-bottom: 30px;">
          <h3 style="margin-top: 0; font-size: 16px;">IMPORTANT POLICY REMINDER</h3>
          <p style="font-size: 14px; color: #cccccc; margin-bottom: 0;">
            As a reminder, you agreed to our No-Return Policy during signup. 
            Because all pieces are 1-of-1, once a product is bought it cannot be replaced or returned. 
            Please always refer to the size chart measurements before purchasing.
          </p>
        </div>

        <p style="font-size: 12px; color: #666666; margin-top: 40px;">
          © ${new Date().getFullYear()} VORNEXE. All rights reserved.
        </p>
      </div>
    `;

    fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: { name: "VORNEXE", email: process.env.EMAIL_USER },
        to: [{ email: email }],
        subject: "Welcome to VORNEXE",
        htmlContent: emailHtml
      })
    }).catch(err => console.error("Failed to trigger Brevo API:", err));

    res.status(201).json({ message: 'Account created successfully!' });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Failed to create account. Please try again.' });
  }
});

// Collab Pitch
app.post('/api/collab', async (req, res) => {
  try {
    const { brandName, email, link, proposal } = req.body;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #ffffff; padding: 40px; text-align: left; border: 1px solid #333;">
        <h2 style="text-transform: uppercase; letter-spacing: 1px; margin-bottom: 30px; border-bottom: 1px solid #333; padding-bottom: 10px;">New Collaboration Pitch</h2>
        
        <p style="margin-bottom: 15px;"><strong>Brand/Designer:</strong> ${brandName}</p>
        <p style="margin-bottom: 15px;"><strong>Contact Email:</strong> <a href="mailto:${email}" style="color: #4a90e2;">${email}</a></p>
        <p style="margin-bottom: 30px;"><strong>Link:</strong> <a href="${link}" target="_blank" style="color: #4a90e2;">${link}</a></p>
        
        <h3 style="text-transform: uppercase; font-size: 14px; color: #888; margin-bottom: 10px;">Proposal:</h3>
        <div style="background-color: #111; padding: 20px; border-radius: 4px; line-height: 1.6; white-space: pre-wrap;">${proposal}</div>
        
        <p style="font-size: 12px; color: #666666; margin-top: 40px; text-align: center;">
          Sent from VORNEXE Collab Portal
        </p>
      </div>
    `;

    // Send email TO the admin
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: { name: "VORNEXE Portal", email: process.env.EMAIL_USER },
        to: [{ email: process.env.EMAIL_USER }], // Send to yourself
        replyTo: { email: email, name: brandName }, // Allow hitting 'Reply' directly
        subject: `Collab Pitch: ${brandName}`,
        htmlContent: emailHtml
      })
    });

    res.status(200).json({ message: 'Pitch sent successfully!' });

  } catch (err) {
    console.error('Collab error:', err);
    res.status(500).json({ error: 'Failed to send pitch. Please try again.' });
  }
});

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD || (process.env.COLLAB_PASSWORD && password === process.env.COLLAB_PASSWORD)) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Razorpay Create Order
app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // Razorpay works in paise
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Create a new product (with image upload)
app.post('/api/products', verifyToken, upload.array('images', 5), async (req, res) => {
  try {
    const imageUrls = req.files ? req.files.map(file => file.path) : [];
    
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price ? parseFloat(req.body.price) : null,
      size: req.body.size || '',
      isSoldOut: req.body.isSoldOut === 'true',
      imageUrls: imageUrls
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update a product
app.put('/api/products/:id', verifyToken, upload.array('images', 5), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price ? parseFloat(req.body.price) : null,
      size: req.body.size || '',
      isSoldOut: req.body.isSoldOut === 'true'
    };

    if (req.files && req.files.length > 0) {
      updateData.imageUrls = req.files.map(file => file.path); // New Cloudinary URLs
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete a product
app.delete('/api/products/:id', verifyToken, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    // Optionally: delete the image from Cloudinary here using deletedProduct.imageUrl
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Get all orders (Protected)
app.get('/api/orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Create a new order
app.post('/api/orders', async (req, res) => {
  try {
    const { productId, shippingDetails, paymentMethod, transactionId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    if (paymentMethod === 'Razorpay') {
      const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex');

      if (generated_signature !== razorpay_signature) {
        return res.status(400).json({ error: 'Payment verification failed' });
      }
    }

    const newOrder = new Order({
      productId,
      shippingDetails,
      paymentMethod,
      transactionId: paymentMethod === 'Razorpay' ? razorpay_payment_id : transactionId,
      status: paymentMethod === 'Razorpay' ? 'Paid & Verified' : 'Pending Verification'
    });

    const savedOrder = await newOrder.save();

    // Mark product as sold out
    await Product.findByIdAndUpdate(productId, { isSoldOut: true });

    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to process order' });
  }
});

// --- KEEP-ALIVE PING ---
// Render spins down free tier instances after 15 mins of inactivity.
// This pings the server every 14 minutes to keep it awake.
const https = require('https');
const RENDER_URL = process.env.RENDER_EXTERNAL_URL;

if (RENDER_URL) {
  setInterval(() => {
    https.get(`${RENDER_URL}/api/products`, (resp) => {
      console.log(`Keep-alive ping sent to ${RENDER_URL}: ${resp.statusCode}`);
    }).on('error', (err) => {
      console.error('Keep-alive ping failed:', err.message);
    });
  }, 14 * 60 * 1000); // 14 minutes
}

app.listen(PORT, () => {
  console.log(`Vornexe backend running on http://localhost:${PORT}`);
});

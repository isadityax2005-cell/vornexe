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
const ContactMessage = require('./models/ContactMessage');

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
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session expired. Please log in again.' });
    }
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
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
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
    const now = new Date();
    // Map products to include isReserved flag based on reservedUntil
    const mappedProducts = products.map(p => {
      const isReserved = p.reservedUntil && p.reservedUntil > now;
      return {
        ...p.toJSON(),
        isReserved: !!isReserved
      };
    });
    res.json(mappedProducts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Reserve a product for 7 minutes
app.post('/api/products/:id/reserve', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.isSoldOut) return res.status(400).json({ error: 'Product is already sold out' });
    
    const now = new Date();
    if (product.reservedUntil && product.reservedUntil > now) {
      return res.status(400).json({ error: 'Product is currently reserved by another user' });
    }

    // Generate random token and set 7 minute expiration
    const reservationToken = crypto.randomBytes(16).toString('hex');
    const reservedUntil = new Date(now.getTime() + 7 * 60 * 1000); // 7 mins

    product.reservedUntil = reservedUntil;
    product.reservationToken = reservationToken;
    await product.save();

    res.json({ success: true, reservationToken, reservedUntil });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reserve product' });
  }
});

// Release a product reservation early
app.post('/api/products/:id/release', async (req, res) => {
  try {
    const { reservationToken } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (product && product.reservationToken === reservationToken) {
      product.reservedUntil = null;
      product.reservationToken = null;
      await product.save();
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to release product' });
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

// Ship an order (Protected)
app.put('/api/orders/:id/ship', verifyToken, async (req, res) => {
  try {
    const { trackingNumber, trackingLink } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    order.isShipped = true;
    order.trackingNumber = trackingNumber || '';
    order.trackingLink = trackingLink || '';
    order.status = 'Shipped';
    
    await order.save();

    // Trigger Brevo Email (Optional: Don't await to avoid blocking)
    if (order.shippingDetails?.email && process.env.BREVO_API_KEY) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #ffffff;">
          <h1 style="color: #ffffff; text-align: center; font-family: monospace; letter-spacing: 2px;">VORNEXE</h1>
          <h2 style="text-align: center; border-bottom: 1px solid #333; padding-bottom: 20px;">YOUR ORDER HAS SHIPPED</h2>
          <p>Hi ${order.shippingDetails.fullName},</p>
          <p>Your 1-of-1 VORNEXE piece is on the way!</p>
          <div style="background-color: #1a1a1a; padding: 20px; margin: 20px 0; border-left: 4px solid #ffffff;">
            <p style="margin: 0;"><strong>Tracking Number:</strong> ${trackingNumber}</p>
            ${trackingLink ? `<p style="margin: 10px 0 0 0;"><a href="${trackingLink}" style="color: #ffffff; text-decoration: underline;">Track your package here</a></p>` : ''}
          </div>
          <p>Thank you for supporting the archive.</p>
        </div>
      `;

      fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: 'VORNEXE Archive', email: 'vornexe.official@gmail.com' },
          to: [{ email: order.shippingDetails.email }],
          subject: 'Your VORNEXE Order Has Shipped',
          htmlContent: emailHtml
        })
      }).catch(err => console.error("Failed to send shipping email:", err));
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to ship order' });
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
    const { productId, shippingDetails, paymentMethod, transactionId, razorpay_payment_id, razorpay_order_id, razorpay_signature, discountCode, finalPrice, reservationToken } = req.body;

    const productCheck = await Product.findById(productId);
    if (!productCheck) return res.status(404).json({ error: 'Product not found' });
    if (productCheck.isSoldOut) return res.status(400).json({ error: 'Product is sold out' });
    
    // Check if reserved by someone else
    const now = new Date();
    if (productCheck.reservedUntil && productCheck.reservedUntil > now) {
      if (productCheck.reservationToken !== reservationToken) {
        return res.status(400).json({ error: 'Product is currently reserved by another user' });
      }
    }
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
      status: paymentMethod === 'Razorpay' ? 'Paid & Verified' : 'Pending Verification',
      discountCode: discountCode || '',
      finalPrice: finalPrice || null
    });

    const savedOrder = await newOrder.save();

    // Mark product as sold out
    const product = await Product.findByIdAndUpdate(productId, { isSoldOut: true });

    // Send Receipt Email via Brevo
    if (shippingDetails?.email && process.env.BREVO_API_KEY) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #ffffff;">
          <h1 style="color: #ffffff; text-align: center; font-family: monospace; letter-spacing: 2px;">VORNEXE</h1>
          <h2 style="text-align: center; border-bottom: 1px solid #333; padding-bottom: 20px;">ORDER CONFIRMATION</h2>
          <p>Hi ${shippingDetails.fullName},</p>
          <p>Thank you for securing this 1-of-1 piece from the archive.</p>
          <div style="background-color: #1a1a1a; padding: 20px; margin: 20px 0; border-left: 4px solid #ffffff;">
            <h3 style="margin-top: 0; color: #fff;">Order Details</h3>
            <p style="margin: 5px 0;"><strong>Product:</strong> ${product ? product.name : productId}</p>
            <p style="margin: 5px 0;"><strong>Paid:</strong> ₹${finalPrice || (product ? product.price : 'N/A')}</p>
            ${discountCode ? `<p style="margin: 5px 0; color: #00C851;"><strong>Promo Applied:</strong> ${discountCode}</p>` : ''}
            <h3 style="color: #fff; margin-bottom: 5px;">Shipping To:</h3>
            <p style="margin: 0; color: #aaa;">
              ${shippingDetails.address}<br>
              ${shippingDetails.city}, ${shippingDetails.state} ${shippingDetails.pinCode}
            </p>
          </div>
          <p>We will email you again once your order has shipped.</p>
        </div>
      `;

      fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: 'VORNEXE Archive', email: 'vornexe.official@gmail.com' },
          to: [{ email: shippingDetails.email }],
          subject: 'Your VORNEXE Order Confirmation',
          htmlContent: emailHtml
        })
      }).catch(err => console.error("Failed to send receipt email:", err));
    }

    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to process order' });
  }
});

// Contact Form Submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newMsg = new ContactMessage({ name, email, message });
    await newMsg.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Contact submit error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Admin: Get all contact messages
app.get('/api/admin/messages', verifyToken, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Admin: Reply to message using Brevo
app.post('/api/admin/messages/:id/reply', verifyToken, async (req, res) => {
  try {
    const { replyText } = req.body;
    const msg = await ContactMessage.findById(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    
    // Send email using Brevo
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #ffffff; padding: 40px; text-align: left;">
        <h1 style="font-size: 24px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px;">VORNEXE SUPPORT</h1>
        
        <div style="margin-bottom: 30px; line-height: 1.6;">
          <p>Hi ${msg.name},</p>
          <p>Thank you for reaching out to us regarding:</p>
          <blockquote style="border-left: 3px solid #444; padding-left: 15px; color: #aaa; font-style: italic;">"${msg.message}"</blockquote>
        </div>

        <div style="background-color: #111111; padding: 20px; border: 1px solid #333; margin-bottom: 30px; line-height: 1.6; white-space: pre-wrap;">${replyText}</div>
        
        <p style="font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">- VORNEXE TEAM</p>
      </div>
    `;

    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: { name: "VORNEXE", email: process.env.EMAIL_USER },
        to: [{ email: msg.email }],
        subject: "Re: Your Inquiry to VORNEXE",
        htmlContent: emailHtml
      })
    });

    // Update status to Replied
    msg.status = 'Replied';
    await msg.save();
    
    res.json({ message: 'Reply sent successfully', updatedMessage: msg });
  } catch (err) {
    console.error('Reply error:', err);
    res.status(500).json({ error: 'Failed to send reply' });
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

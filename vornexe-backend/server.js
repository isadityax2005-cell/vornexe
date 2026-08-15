const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'db.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

// Initialize db.json if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ products: [] }));
}

// Middleware
app.use(cors());
app.use(express.json());
// Serve the uploaded images statically
app.use('/uploads', express.static(UPLOADS_DIR));

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext);
  }
});
const upload = multer({ storage: storage });

// Helper to read DB
const readDB = () => {
  const data = fs.readFileSync(DB_FILE);
  return JSON.parse(data);
};

// Helper to write DB
const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// --- API ROUTES ---

// Get all products
app.get('/api/products', (req, res) => {
  const db = readDB();
  res.json(db.products);
});

// Create a new product (with image upload)
app.post('/api/products', upload.single('image'), (req, res) => {
  const db = readDB();
  const newProduct = {
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description,
    price: parseFloat(req.body.price),
    size: req.body.size,
    isSoldOut: req.body.isSoldOut === 'true',
    imageUrl: req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : null,
    createdAt: new Date().toISOString()
  };

  db.products.push(newProduct);
  writeDB(db);

  res.status(201).json(newProduct);
});

// Update a product
app.put('/api/products/:id', upload.single('image'), (req, res) => {
  const db = readDB();
  const productIndex = db.products.findIndex(p => p.id === req.params.id);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const updatedProduct = {
    ...db.products[productIndex],
    name: req.body.name,
    description: req.body.description,
    price: parseFloat(req.body.price),
    size: req.body.size,
    isSoldOut: req.body.isSoldOut === 'true'
  };

  if (req.file) {
    updatedProduct.imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  }

  db.products[productIndex] = updatedProduct;
  writeDB(db);

  res.json(updatedProduct);
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  const db = readDB();
  const productIndex = db.products.findIndex(p => p.id === req.params.id);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  db.products.splice(productIndex, 1);
  writeDB(db);

  res.status(204).send();
});

// Get all orders
app.get('/api/orders', (req, res) => {
  const db = readDB();
  res.json(db.orders || []);
});

// Create a new order
app.post('/api/orders', (req, res) => {
  const db = readDB();
  if (!db.orders) db.orders = [];

  const newOrder = {
    id: uuidv4(),
    productId: req.body.productId,
    shippingDetails: req.body.shippingDetails,
    paymentMethod: req.body.paymentMethod,
    transactionId: req.body.transactionId, // For manual UPI
    status: 'Pending Verification',
    createdAt: new Date().toISOString()
  };

  db.orders.push(newOrder);

  // Mark product as sold out
  const productIndex = db.products.findIndex(p => p.id === req.body.productId);
  if (productIndex !== -1) {
    db.products[productIndex].isSoldOut = true;
  }

  writeDB(db);

  res.status(201).json(newOrder);
});

app.listen(PORT, () => {
  console.log(`Vornexe backend running on http://localhost:${PORT}`);
});

const express = require('express');
const router = express.Router()
const requestLoggerMiddleware = require("../middlewares/requestLoggerMiddleware.js")
const authenticationMiddleware = require("../middlewares/authenticationMiddleware.js")
const validationMiddleware = require("../middlewares/validationMiddleware.js")

router.use(express.urlencoded({ extended: true }));
router.use(requestLoggerMiddleware)

let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

router.get('/', (req, res)=>{
    res.send("Hello World")
});

// GET all products with filtering, pagination & search
router.get('/api/products', (req, res) => {
  let { category, page = 1, limit = 5, search } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

 
  // Filter by category
if (category) {
  result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

// Search by name
if (search) {
  result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
}

// Pagination
const startIndex = (page - 1) * limit;
const paginated = products.slice(startIndex, startIndex + limit);

  res.json({
    total: products.length,
    page,
    limit,
    data: paginated
  });
});

// GET single product by ID
router.get('/api/products/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }
  res.json(product);
});

// POST create a new product
router.post('/api/products', authenticationMiddleware, validationMiddleware, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = { id: uuidv4(), name, description, price, category, inStock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update a product
router.put('/api/products/:id',authenticationMiddleware, validationMiddleware, (req, res, next) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex === -1) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }

  const { name, description, price, category, inStock } = req.body;
  products[productIndex] = { id: req.params.id, name, description, price, category, inStock };
  res.json(products[productIndex]);
});

// DELETE product
router.delete('/api/products/:id', authenticationMiddleware, (req, res, next) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex === -1) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }
  const deleted = products.splice(productIndex, 1);
  res.json({ message: 'Product deleted', deleted });
});

// GET product statistics (count by category)
router.get('/api/products/stats', (req, res) => {
  const stats = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});
  res.json(stats);
});

// Error handling
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

module.exports = router
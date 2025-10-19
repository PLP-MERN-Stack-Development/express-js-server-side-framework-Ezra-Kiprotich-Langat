// Validation middleware for create/update
const validationMiddleware = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || price == null || !category || inStock == null) {
    return res.status(400).json({ error: 'All product fields are required.' });
  }
  if (typeof price !== 'number') {
    return res.status(400).json({ error: 'Price must be a number.' });
  }
  next();
};

module.exports = validationMiddleware;
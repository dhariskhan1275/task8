const express = require('express');
const productRouter = express.Router();

const availableProducts = [
  { id: 1, name: 'Item A', price: 25 },
  { id: 2, name: 'Item B', price: 30 },
  { id: 3, name: 'Item C', price: 40 }
];

productRouter.get('/items', (req, res) => {
  res.json(availableProducts);
});

productRouter.post('/cart/add/:productID', authenticateUser, (req, res) => {
  const productID = parseInt(req.params.productID);
  const selectedProduct = availableProducts.find(product => product.id === productID);
  
  if (selectedProduct) {
    res.send(`Added ${selectedProduct.name} to the cart.`);
  } else {
    res.status(404).send('Product not found.');
  }
});

productRouter.get('/items/:id', (req, res) => {
  const requestedID = req.params.id;
  const product = availableProducts.find(p => p.id === parseInt(requestedID));
  
  if (!product) {
    res.status(404).send('Product not found');
    return;
  }
  
  res.json(product);
});

module.exports = productRouter;


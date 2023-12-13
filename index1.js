const express = require('express');
const server = express();
const shopRoutes = require('./shopRoutes');
const securityRoutes = require('./securityRoutes');

const PORT_NUMBER = 3000;

const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method} ${req.url}`);
  next();
};

const authorizeAccess = (req, res, next) => {
  const isLoggedIn = true;
  if (isLoggedIn) {
    next();
  } else {
    res.status(401).send('Access Denied. Please log in.');
  }
};

server.use(express.urlencoded({ extended: true }));
server.use(requestLogger);

server.use('/shop', shopRoutes);
server.use('/security', securityRoutes);

server.listen(PORT_NUMBER, () => {
  console.log(`Server is up and running on port ${PORT_NUMBER}`);
});

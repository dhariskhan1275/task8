const express = require('express');
const passwordRouter = express.Router();
const passwordValidator = require('password-validator');

// Define a password validation schema
const passwordSchema = new passwordValidator();
passwordSchema
  .is().min(8) // Minimum length 8
  .is().max(20) // Maximum length 20
  .has().uppercase() // Must include uppercase letters
  .has().lowercase() // Must include lowercase letters
  .has().digits(1) // Must include at least 1 digit
  .has().symbols(1) // Must include at least 1 symbol
  .has().not().spaces(); // Should not include spaces

// Middleware to parse JSON in POST requests
passwordRouter.use(express.json());

// Endpoint to validate password strength
passwordRouter.post('/validate-password', (req, res) => {
  const { password } = req.body;
  // Check password against the defined schema
  const isPasswordValid = passwordSchema.validate(password);
  if (isPasswordValid) {
    res.status(200).json({ message: 'Password meets strength requirements!' });
  } else {
    res.status(400).json({ message: 'Password does not meet the specified criteria.' });
  }
});

module.exports = passwordRouter;

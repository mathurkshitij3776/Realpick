const { body, validationResult } = require('express-validator');

const validateSignup = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

const validateProduct = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('tagline').trim().notEmpty().withMessage('Tagline is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('websiteUrl').isURL().withMessage('Valid website URL is required'),
  body('logoUrl').notEmpty().withMessage('Logo URL is required'),
  body('categories').isArray({ min: 1 }).withMessage('At least one category is required'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateSignup,
  validateLogin,
  validateProduct,
  handleValidationErrors,
};

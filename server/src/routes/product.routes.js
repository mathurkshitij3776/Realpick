const express = require('express');
const productController = require('../controllers/productController');
const { validateProduct, handleValidationErrors } = require('../middleware/validator');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', authMiddleware, validateProduct, handleValidationErrors, productController.createProduct);
router.post('/:id/upvote', productController.upvoteProduct);

module.exports = router;

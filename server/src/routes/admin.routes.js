const express = require('express');
const adminController = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication and admin privileges
router.use(authMiddleware, adminMiddleware);

router.get('/products/pending', adminController.getPendingProducts);
router.post('/products/:id/approve', adminController.approveProduct);
router.post('/products/:id/reject', adminController.rejectProduct);

module.exports = router;

const productService = require('../services/productService');
const logger = require('../config/logger');

class AdminController {
  async getPendingProducts(req, res, next) {
    try {
      const products = await productService.getPendingProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async approveProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productService.updateProductStatus(id, 'approved');
      
      logger.info(`Product approved: ${product.name} by admin ${req.user.email}`);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async rejectProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productService.updateProductStatus(id, 'rejected');
      
      logger.info(`Product rejected: ${product.name} by admin ${req.user.email}`);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();

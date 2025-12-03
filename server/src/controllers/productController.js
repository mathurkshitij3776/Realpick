const productService = require('../services/productService');
const logger = require('../config/logger');

class ProductController {
  async getAllProducts(req, res, next) {
    try {
      const { category, search } = req.query;
      const products = await productService.getAllProducts({ category, search });
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      const vendorId = req.user.id; // From authMiddleware
      const product = await productService.createProduct(req.body, vendorId);
      
      logger.info(`New product created: ${product.name} by user ${vendorId}`);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  async upvoteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productService.upvoteProduct(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();

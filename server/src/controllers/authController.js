const authService = require('../services/authService');
const logger = require('../config/logger');

class AuthController {
  async signup(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const result = await authService.signup(name, email, password);
      
      logger.info(`New user registered: ${email}`);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      
      logger.info(`User logged in: ${email}`);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      // req.user is set by authMiddleware
      res.json({ user: req.user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();

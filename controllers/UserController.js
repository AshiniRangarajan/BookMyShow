const UserService = require('../services/UserService');

class UserController {
  static async register(req, res) {
    try {
      const userData = req.body;
      const result = await UserService.register(userData);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await UserService.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UserController;

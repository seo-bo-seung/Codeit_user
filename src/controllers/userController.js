import express from 'express';
import userService from '../services/userService.js';


const userController = express.Router();


export default userController;

import userService from '../services/userService.js';

userController.post('/users', async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});


userController.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await userService.getUser(email, password);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  });
  

  userController.post('/session-login', async (req, res, next) => {
    const { email, password } = req.body
  
    try {
      const user = await userService.getUser(email, password);
      req.session.userId = user.id;
      return res.json(user);
    } catch (error) {
      next(error);
    }
  });
  

  productController.post('/', async (req, res, next) => {
    const createdProduct = await productService.create(req.body);
    return res.json(createdProduct);
  });
  

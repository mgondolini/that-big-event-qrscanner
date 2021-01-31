const express = require('express');
const userService = require('../services/userService');
const authService = require('../services/authService');

const router = new express.Router();

/**
 * Register user into the system. 
 * This is only to generate user hashed password, not use in FE side
 */
router.post('/auth/signup', authService.signup);

/**
 * Logs user into the system
 */
router.post('/auth/login', async (req, res, next) => {
  const options = {
    email: req.body.email,
    password: req.body.password
  };

  try {
    const result = await authService.login(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Add Contact to user contacts
 */
router.put('/user/addContact/:code', authService.verifyToken, async (req, res, next) => {
  const code = {code: req.params.code};
  const email = {email: req.body.email};
  
  global.log('Add contact'); //DEBUG
  try {
    const result = await userService.addContact(code, email);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

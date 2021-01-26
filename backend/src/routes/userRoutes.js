const express = require('express');
const userService = require('../services/userService');

const router = new express.Router();
console.log('routes');

/**
 * Logs user into the system
 */
router.post('/login', async (req, res, next) => {
  //TODO configurare il body su swagger
  console.log(req.query.email);
  
  const options = {
    email: req.query.email,
    password: req.query.password
  };

  try {
    const result = await userService.loginUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Logs out current logged in user session
 */
router.get('/logout', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await userService.logoutUser(options);
    res.status(200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

/**
 * Find user by code. This can only be done by the logged in 
 * user.
 */
router.get('/findUser/:code', async (req, res, next) => {
  const options = {
    code: req.params['code']
  };

  try {
    const result = await userService.findUser(options);
    res.status(200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Add Contact to user contacts
 */
router.put('/addContact', async (req, res, next) => {
  const options = {
    contact: req.query['contact'],
    body: req.body['body']
  };

  try {
    const result = await userService.addContact(options);
    res.status(200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

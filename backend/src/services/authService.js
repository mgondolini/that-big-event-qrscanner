const secret = 'richardbenson';
const mongoose = require('mongoose');
const User = mongoose.model('User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
  console.log('SIGNUP');
  console.log(req.body);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    company: req.body.company,
    code: req.body.code,
    contacts: []
  });

  user.save(err => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: 'User was registered successfully!' });
  });
};

/**
 * @param {Object} options
 * @param {String} options.email The email for login
 * @param {String} options.password The password for login
 * @return {Promise}
 */
exports.login = async (options) => {
  const query = {email:  options.email};
  
  const response = {
    status: 200,
    data: ''
  };

  //TODO RESPONSE CON TOKEN
  const hashedPsw = await User.findOne(query)
    .exec()
    .then((user) => {
      if (user == null) {
        response.status = 400;
        response.data = 'user_not_found';
        global.log('User not found'); // DEBUG
      } else {
        response.status = 200;
        response.data = user;
        global.log(`Found user ->${user.email}`); // DEBUG
        return user.password;
      }
    })
    .catch((err) => {
      global.log(`Error while loading user: ${err}`); // DEBUG
      response.status = 500;
      response.data = 'Error while loading user';
    });

  if (!response.data)
    return response;

  console.log('Hash: ', hashedPsw);

  const passwordIsValid = bcrypt.compareSync(
    options.password,
    hashedPsw
  );

  console.log('Valid psw? ', passwordIsValid);

  const token = jwt.sign({ id: options.email }, secret, {
    expiresIn: 86400 // 24 hours
  });

  response.data.token = token;
  console.log(response.data);

  return response;
};
const config = require('../../config.json');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const secret = config.secret;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.verifyToken = (req, res, next) => {
  const token = req.headers.token;
  global.log(`token received ${token}`);
  global.log(JSON.stringify(req.body));

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ data: 'Unauthorized!' });
    }
    global.log(JSON.stringify(decoded));
    req.body.email = decoded.id;
    
    next();
  });
};

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

  console.log('options', options);

  let status = 200;
  let data = {};

  const hashedPsw = await User.findOne(query)
    .exec()
    .then((user) => {
      if (user == null) {
        status = 400;
        data = 'User not found';
        global.log('User not found'); // DEBUG
      } else {
        status = 200;
        data.user = user;
        global.log(`Found user ->${user.email}`); // DEBUG
        return user.password;
      }
    })
    .catch((err) => {
      global.log(`Error while loading user: ${err}`); // DEBUG
      status = 500;
      data = 'Error while loading user';
    });

  if (!data)
    return data;

  if (hashedPsw !== undefined) {
    const passwordIsValid = bcrypt.compareSync(
      options.password,
      hashedPsw
    );

    console.log('Valid psw? ', passwordIsValid);

    if (!passwordIsValid) {
      status = 400;
      data = 'Wrong password';
    }

    const token = jwt.sign({ id: options.email }, secret, {
      expiresIn: 86400 // 24 hours
    });

    data.token = token;
  }

  return {
    status,
    data
  };
};
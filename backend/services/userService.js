const mongoose = require('mongoose');
const User = mongoose.model('User');

console.log('user service');
/**
 * @param {Object} options
 * @param {String} options.email The email for login
 * @param {String} options.password The password for login
 * @throws {Error}
 * @return {Promise}
 */
exports.loginUser = async (options) => {
  const query = {email:  options.email , password: options.password};

  console.log('loginuser');
  await User.findOne(query)
    .exec()
    .then((user) => {
      if (user == null) {
        // res.status(400).send({ description: 'user_not_found' });
        global.log('User not found'); // DEBUG
      } else {
        // res.status(200).json(user);
        global.log(`Found user ->${user.email}`); // DEBUG
      }
    })
    .catch((err) => {
      global.log(`Error while loading user: ${err}`); // DEBUG
      // res.status(500).send('error');
    });
};

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.logoutUser = async (options) => {
  console.log(options);
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'logoutUser ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.code user that needs to be found
 * @throws {Error}
 * @return {Promise}
 */
module.exports.findUser = async (options) => {
  console.log(options);
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'findUser ok!'
  };
};

/**
 * @param {Object} options
 * @param {String} options.contact contact that need to be added
 * @param {Object} options.body Updated user object
 * @throws {Error}
 * @return {Promise}
 */
module.exports.addContact = async (options) => 
  console.log(options); {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'addContact ok!'
  };
}


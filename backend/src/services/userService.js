const mongoose = require('mongoose');
const User = mongoose.model('User');

/**
 * @param {Object} options
 * @param {String} options.email The email for login
 * @param {String} options.password The password for login
 * @return {Promise}
 */
exports.loginUser = async (options) => {
  const query = {email:  options.email , password: options.password};
  
  const response = {
    status: 200,
    data: ''
  };

  await User.findOne(query)
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
      }
    })
    .catch((err) => {
      global.log(`Error while loading user: ${err}`); // DEBUG
      response.status = 500;
      response.data = 'error';
    });

  return response;
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
module.exports.findUser = async (code) => {
  const query = code;

  console.log('code');
  console.log(query);
  
  const response = {
    status: 200,
    data: ''
  };

  await User.findOne(query)
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
      }
    })
    .catch((err) => {
      global.log(`Error while loading user: ${err}`); // DEBUG
      response.status = 500;
      response.data = 'error';
    });

  return response;
};

/**
 * @param {Object} options
 * @param {String} options.contact contact that need to be added
 * @param {Object} options.body Updated user object
 * @throws {Error}
 * @return {Promise}
 */
module.exports.addContact = async (code, email) => {
  console.log(code);
  console.log(email);
    
  const response = {
    status: 200,
    data: ''
  };

  const userFound = await this.findUser(code);

  const contact = {
    firstName: userFound.data.firstName,
    lastName: userFound.data.lastName,
    email: userFound.data.email,
    company: userFound.data.company
  };

  if (userFound.status == 200) {
    User.findOne(email)
      .exec()
      .then((user) => {
        if (user == null) {
          response.status = 400;
          response.data = 'user_not_found';
          console.log('user_not_found');
        } else {
          console.log(contact.data);
          console.log(user.contacts);
          console.log(user);
          if (user.contacts.find(c => c.email !== contact.email)) {
            user.contacts.push(contact);
            console.log(user.contacts);
            user.save()
              .then((updated) => {
                response.status = 200;
                response.data = updated;
                console.log(updated);
              })
              .catch((err) => {
                response.status = 500;
                response.data = `internal_server_error ${err}`;
                console.log('internal_server_error');
              });
          } else {
            response.status = 400;
            response.data = 'user_not_found';
          }
        }
      });
  } else {
    response.status = 400;
    response.data = 'user not found';
  }
  
  return response;
};


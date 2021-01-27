const mongoose = require('mongoose');
const User = mongoose.model('User');

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
exports.logoutUser = async (options) => {
  global.log(options);
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
 * 
 * @param {String} code user that needs to be found
 */
exports.findUserByCode = async (code) => {
  const query = code;

  const response = {
    status: 200,
    data: ''
  };

  await User.findOne(query)
    .exec()
    .then((user) => {
      if (user == null) {
        response.status = 400;
        response.data = 'User code not found';
        global.log('User code not found'); // DEBUG
      } else {
        response.status = 200;
        response.data = user;
        global.log(`Found user ->${user.email}`); // DEBUG
      }
    })
    .catch((err) => {
      global.log(`Error while loading user: ${err}`); // DEBUG
      response.status = 500;
      response.data = 'Error while loading user';
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
exports.addContact = async (code, email) => {
  let status;
  let data;

  //TODO controllare i dati provenienti da questo 
  const userFound = await this.findUserByCode(code);

  const contact = {
    firstName: userFound.data.firstName,
    lastName: userFound.data.lastName,
    email: userFound.data.email,
    company: userFound.data.company
  };

  if (userFound.status == 200) {
    await User.findOne(email)
      .exec()
      .then((user) => {
        console.log('user', user);
        if (user == null) {
          status = 400;
          data = 'user_not_found';
          global.log('user_not_found'); //DEBUG
        } else {
          if (user.contacts.length == 0) {
            user.contacts.push(contact);
          }
          user.contacts.forEach(c => {
            if (c.email !== contact.email) {
              user.contacts.push(contact);
              global.log(user.contacts); //DEBUG
            } else {
              status = 400;
              data = 'Contact already inserted';
              global.log('contact already inserted'); //DEBUG
            }
          });
          user.save()
            .then((updated) => {
              status = 200;
              data = updated;
              global.log('updated',updated); //DEBUG
            })
            .catch((err) => {
              status = 500;
              data = `internal_server_error ${err}`;
              global.log('internal_server_error'); //DEBUG
            });
        }
      });
  } else {
    status = 400;
    data = 'User not found';
  }

  return {
    status,
    data
  };
};


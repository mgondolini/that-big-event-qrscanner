const mongoose = require('mongoose');
const User = mongoose.model('User');
const Contact = mongoose.model('Contact');

/**
 * 
 * @param {String} code user that needs to be found
 */
exports.findUserByCode = async (code) => {
  const query = code;

  let status = 200;
  let data = {};

  await User.findOne(query)
    .exec()
    .then((user) => {
      if (user == null) {
        status = 400;
        data = 'Code not found';
        global.log('User code not found'); // DEBUG
      } else {
        status = 200;
        data = user;
        global.log(`Found user ->${user.email}`); // DEBUG
      }
    })
    .catch((err) => {
      global.log(`Error while loading user: ${err}`); // DEBUG
      status = 500;
      data = 'Error while loading user';
    });

  return {
    status,
    data
  };
};

/**
 * @param {Object} options
 * @param {String} options.contact contact that need to be added
 * @param {Object} options.body Updated user object
 * @throws {Error}
 * @return {Promise}
 */
exports.addContact = async (code, email) => {
  let status = 200;
  let data = {};

  //TODO controllare i dati provenienti da questo 
  const userFound = await this.findUserByCode(code);

  const contact = new Contact({
    firstName: userFound.data.firstName,
    lastName: userFound.data.lastName,
    email: userFound.data.email,
    company: userFound.data.company
  });

  if (userFound.status != 200) {
    status = userFound.status;
    data = userFound.data;
    global.log(userFound.data); //DEBUG
  } else {
    const loggedUser = await User.findOne(email)
      .exec()
      .then((user) => {
        if (user == null) {
          status = 400;
          data = 'User not found';
          global.log('user_not_found'); //DEBUG
        } else {
          return user;
        }
      })
      .catch((error) => {
        status = 500;
        data = 'Error while loading user';
        global.log(`Error while loading user ${error}`);
      });
      
    if (loggedUser.contacts.length === 0) {
      loggedUser.contacts.push(contact);
    } else {
      loggedUser.contacts.forEach(c => {
        if (c.email !== contact.email) {
          loggedUser.contacts.push(contact);
        } else {
          status = 400;
          data = 'Contact already inserted';
          global.log('Contact already inserted'); //DEBUG
          return;
        }
      });
    }

    if (status === 200) {
      await loggedUser.save()
        .then((updated) => {
          status = 200;
          data.user = updated;
        })
        .catch((err) => {
          status = 500;
          data = 'Internal Server Error';
          global.log(`internal_server_error  ${err}`); //DEBUG
        });
    }
  }

  global.log('data:');
  global.log(JSON.stringify(data));
  return {
    status,
    data
  };
};


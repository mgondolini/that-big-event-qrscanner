const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContactSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  company: String,
}, { _id: false });

module.exports = mongoose.model('Contact', ContactSchema);

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  company: String,
  code: { type: String, required: true },
  contacts: []
});

module.exports = mongoose.model('User', UserSchema, 'user');
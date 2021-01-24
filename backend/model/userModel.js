const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContactSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  company: String,
}, { _id: false });

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  company: String,
  code: { type: Number, required: true },
  contact: ContactSchema
});

module.exports = mongoose.model('User', UserSchema, 'User');
/* eslint-disable no-process-env */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config.json');

const app = express();

app.use(express.json());
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
global.log = function log (msg) {
  console.log(`[log] ${msg}`);
};

/**
 * Mongoose
 */
mongoose.connect(config.db.connection_string, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  // we're connected!
  global.log('Connected to mongodb');
});

// TODO insert here the require for every db schema you need
require('./src/model/userModel');

global.appRoot = path.resolve(__dirname);

/**
 * Routes
 */
const router = require('./src/routes/routes');
app.use('/', router);

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'token, Origin, Content-Type, Accept'
  );
  next();
});

// Deploy
const port = process.env.PORT || config.port || 3001;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/public/`));
  // app.get(/.*/, (req, res) => res.sendFile(`${__dirname}/public/index.html`));
}

app.listen(port, () => {
  global.log(`Node API server started on port ${port}`);
});
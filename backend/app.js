const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50MB' }));
 
global.log = function log (msg) {
  console.log(msg);
};

mongoose.connect('mongodb+srv://BEadmin:BEadmin@cluster0.h1eqt.mongodb.net/cluster0?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// TODO insert here the require for every db schema you need

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

app.listen(3000, () => {
  global.log('Node API server started on port 3000');
});
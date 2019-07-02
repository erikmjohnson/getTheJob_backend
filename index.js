'use strict';

/** NODE PACKAGES
 * Mongoose
 * Dotenv
 */
require('dotenv').config();
const mongoose = require('mongoose');

/** Defines our options for the mongoose database*/
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
};

/** Creates new connection to mongoose */
mongoose.connect(process.env.MONGODB_URI, options);

/** Requirement of PORT from .env */
require('./src/app.js').start(process.env.PORT);
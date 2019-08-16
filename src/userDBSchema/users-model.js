'use strict';

/** NODE PACKAGES
 * Mongoose
 * Jsonwebtoken
 * Bcrypt
 * Dotenv
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

/**
 * Creates 'user' as a new mongo schema, and defines types for username and password.
 * @type {mongoose.Schema}
 */
const userSchema = new Schema({
  username: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  notes: [{ type: Schema.Types.ObjectId, ref: 'Notes' }]
});

/** Hashes given password.*/
userSchema.pre('save', function(next) {
  if(this.password.length < 20) {
  bcrypt.hash(this.password,10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    }).catch(err => {throw err;});
  } else {
    next()
  }
});

/**
 * Runs authenticateBasic based on...
 * @param auth - compares username with what's in Schema
 * @returns {boolean|*} - calls comparePassword function to verify password
 */
userSchema.statics.authenticateBasic = function(auth) {
  let query = {username:auth.username};
  return this.findOne(query)
    .then(user => {
      return user && user.comparePassword(auth.password)})
    .catch(console.error);
};

/**
 * This function compares the password with what's in the schema
 * @param password - given password
 * @returns {*} - uses bcrypt to compare the this.password with what's in the Schema
 */
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};

/**
 * Function that generates a token and assigns it to an _id in the Schema
 * @returns {*} - uses jsonwebtoken to sign the tokenData and salts it with our .env file's SECRET
 */
userSchema.methods.generateToken = function() {
  let tokenData = {
    id: this._id,
  };
  return jwt.sign(tokenData, process.env.SECRET || 'test');
};

/** Sets our schema as a model sub-type of the document type in mongoose*/
let User = mongoose.model('User', userSchema);

/** Exports user-model for use outside of this file.*/
module.exports = User;

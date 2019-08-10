'use strict';

/** DEPENDENCIES
 * Mongoose
 */
const mongoose = require('mongoose');

/** notesSchema variable
 * Creates 'savedNotes' as a new mongo schema, and defines types for noteTitle, summary, and date.
 * @type {mongoose.Schema}
 */
const noteSchema = new mongoose.Schema({
  organization: {type: String},
  title: {type:String},
  location: {type:String},
  summary: {type:String},
  date: {type:String},
  url: {type:String},
});

/** Sets our schema as a model sub-type of the document type in mongoose*/
let Notes =  mongoose.model('Notes', noteSchema);

/** Exports noteSchema for use outside of this file.*/
module.exports = Notes;

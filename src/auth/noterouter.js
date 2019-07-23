'use strict';

/** NODE PACKAGES
 * Express
 */
const express = require('express');
const noteRouter = express.Router();
const Notes = require('../userDBSchema/noteSchema');
const User = require('../userDBSchema/users-model');

/** retrieves data for a username*/
noteRouter.get('/retrieve/:username', (req, res, next) => {
  User.find({username:`${req.params.username}`})
    .populate('notes')
    .then(data => {
      res.status(200).json(data[0].notes);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});

/** deletes job posting from a specific user*/
noteRouter.delete('/delete/:username', (req, res, next) => {

  User.updateOne(
    {'username': `${req.params.username}`},
    {$pull: {'notes': `${req.body.id}`}})
    .then(() => {
      Notes.findByIdAndDelete(req.body.id)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    })
});

/** saves the note to the job for later reference*/
noteRouter.post('/save/:username', (req, res, next) => {
  let note = new Notes(req.body);
  note.save();

  User.find({username:`${req.params.username}`})
    .then(data => {
      data[0].notes.push(note);
      data[0].save();
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});

/** Exports noteRouter for use outside of this file.*/
module.exports = noteRouter;

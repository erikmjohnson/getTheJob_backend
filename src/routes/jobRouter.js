'use strict';

/** NODE PACKAGES & DEPENDENCIES
 * express
 * Job
 * User
 */
const express = require('express');
const jobRouter = express.Router();
const Job = require('../userDBSchema/jobs-model');
const User = require('../userDBSchema/users-model');

/** retrieves data for a username*/
jobRouter.get('/retrieve/:username', (req, res, next) => {
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
jobRouter.delete('/delete/:username', (req, res, next) => {

  User.populate('notes').updateOne(
    {'username': `${req.params.username}`},
    {$pull: {'notes': `${req.body.id}`}})
    .then(() => {
      Job.findByIdAndDelete(req.body.id)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    })
});

/** saves the note to the job for later reference*/
jobRouter.post('/save/:username', (req, res, next) => {
  let note = new Job(req.body);
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
module.exports = jobRouter;

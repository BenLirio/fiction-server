const express = require('express')
const passport = require('passport')

const Story = require('../models/story')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// INDEX
// GET /storys
router.get('/storys', requireToken, (req, res, next) => {
  Story.find()
    .then(storys => {
      return storys
        .map(story => story.toObject())
        .filter(story => story.owner._id.toString() === req.user.id.toString())
    })
    .then(storys => res.status(200).json({ storys: storys }))
    .catch(next)
})

// SHOW
// GET /storys/5a7db6c74d55bc51bdf39793
router.get('/storys/:id', requireToken, (req, res, next) => {
  Story.findById(req.params.id)
    .then(handle404)
    .then(story => res.status(200).json({ story: story.toObject() }))
    .catch(next)
})

// CREATE
// POST /storys
router.post('/storys', requireToken, (req, res, next) => {
  req.body.story.owner = req.user.id

  Story.create(req.body.story)
    .then(story => {
      res.status(201).json({ story: story.toObject() })
    })
    .catch(next)
})

// UPDATE
// PATCH /storys/5a7db6c74d55bc51bdf39793
router.patch('/storys/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.story.owner

  Story.findById(req.params.id)
    .then(handle404)
    .then(story => {
      requireOwnership(req, story)

      return story.updateOne(req.body.story)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
// DELETE /storys/5a7db6c74d55bc51bdf39793
router.delete('/storys/:id', requireToken, (req, res, next) => {
  Story.findById(req.params.id)
    .then(handle404)
    .then(story => {
      requireOwnership(req, story)
      story.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router

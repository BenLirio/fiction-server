const express = require('express')
const passport = require('passport')

const Slate = require('../models/slate')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// INDEX
// GET /slates
router.get('/slates', requireToken, (req, res, next) => {
  Slate.find()
    .then(slates => {
      return slates.map(slate => slate.toObject())
    })
    .then(slates => res.status(200).json({ slates: slates }))
    .catch(next)
})

// SHOW
// GET /slates/5a7db6c74d55bc51bdf39793
router.get('/slates/:id', requireToken, (req, res, next) => {
  Slate.findById(req.params.id)
    .then(handle404)
    .then(slate => res.status(200).json({ slate: slate.toObject() }))
    .catch(next)
})

// CREATE
// POST /slates
router.post('/slates', requireToken, (req, res, next) => {
  req.body.slate.owner = req.user.id

  Slate.create(req.body.slate)
    .then(slate => {
      res.status(201).json({ slate: slate.toObject() })
    })
    .catch(next)
})

// UPDATE
// PATCH /slates/5a7db6c74d55bc51bdf39793
router.patch('/slates/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.slate.owner

  Slate.findById(req.params.id)
    .then(handle404)
    .then(slate => {
      requireOwnership(req, slate)
      return slate.updateOne(req.body.slate)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
// DELETE /slates/5a7db6c74d55bc51bdf39793
router.delete('/slates/:id', requireToken, (req, res, next) => {
  Slate.findById(req.params.id)
    .then(handle404)
    .then(slate => {
      requireOwnership(req, slate)
      slate.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router

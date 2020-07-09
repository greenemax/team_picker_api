const express = require('express')
const Player = require('../models/player')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const passport = require('passport')
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// INDEX
// GET /examples
router.get('/players', (req, res, next) => {
  Player.find()
    .then(players => {
      return players.map(player => player.toObject())
    })
    .then(players => res.status(200).json({ players: players }))
    .catch(next)
})

// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
router.get('/players/:id', (req, res, next) => {
  Player.findById(req.params.id)
    .then(handle404)
    .then(player => res.status(200).json({ player: player.toObject() }))
    .catch(next)
})

// CREATE
// POST /examples
router.post('/players', requireToken, (req, res, next) => {
  Player.create(req.body.player)
    .then(player => {
      res.status(201).json({ player: player.toObject() })
    })
    .catch(next)
})

// UPDATE
// PATCH /examples/5a7db6c74d55bc51bdf39793
router.patch('/players/:id', removeBlanks, requireToken, (req, res, next) => {
  Player.findById(req.params.id)
    .then(handle404)
    .then(player => {
      return player.updateOne(req.body.player)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/players/:id', requireToken, (req, res, next) => {
  Player.findById(req.params.id)
    .then(handle404)
    .then(player => {
      player.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router

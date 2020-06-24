const express = require('express')
const User = require('./../models/user')
// const { Lineup } = require('./../models/lineup')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
// const requireOwnership = customErrors.requireOwnership
// const removeBlanks = require('../../lib/remove_blank_fields')
const router = express.Router()
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })
const deepIndexOf = require('../../lib/deep_indexOf')
const lodash = require('lodash')
const errorHandler = require('../../lib/error_handler')

// GET all lineups listed to the user
router.get('/lineups/', requireToken, (req, res, next) => {
  User.findById(req.user)
    .populate('lineup.players')
    .then(handle404)
    .then(user => {
      console.log(user)
      return user.lineups
    })
    .then(lineups => res.status(200).json({ lineup: lineups }))
    .catch(next)
})

// Show a lineup
router.get('/lineup/:id', requireToken, (req, res, next) => {
  User.findById(req.user)
    .populate('lineup.players')
    .then(handle404)
    .then(user => {
      console.log(user)
      return user.lineups.id(req.params.id)
    })
    .then(lineup => res.status(200).json({ lineup: lineup.toObject() }))
    .catch(next)
})

// delete a lineup
router.delete('/lineup/:id', requireToken, (req, res, next) => {
  User.findById(req.user._id)
    .then(handle404)
    .then(user => {
      user.lineups.id(req.params.id).remove()
      user.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
// create a lineup
router.post('/lineup', requireToken, (req, res, next) => {
  const lineup = req.body.lineup
  lineup.owner = req.user._id
  // save lineup to mongodb
  console.log(req.user._id)
  User.findById(req.user._id)
    .then(handle404)
    .then(user => {
      user.lineups.push(lineup)
      return user.save()
    })
    .then(user => res.status(201).json({ user: user.toObject() }))
    // on error respond with 500 and error message
    .catch(next)
})

// add player to lineup
router.patch('/lineup/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  const player = req.body.player
  const user = req.user
  User.findById(user)
  console.log(user)
    .then((user) => {
      const lineup = user.lineup.id(id) // returns a matching subdocument
      lineup.player.push(player._id) // updates the address while keeping its schema
      return user.save() // saves document with subdocuments and triggers validation
    })
    .then(lineup => res.sendStatus(204))
    .catch(next)
})

router.patch('/lineup/:id/players', requireToken, (req, res, next) => {
  const id = req.params.id
  const player = req.body.player
  const playerId = player._id
  const user = req.user
  User.findById(user)
    .then(handle404)
    .then(user => {
      const lineup = user.lineups.id(id)
      const deletedPlayer = lineup.player.find(player => player === playerId)
      const index = deepIndexOf(lineup.players, deletedPlayer)
      const playerArray = [...lineup.player]
      lodash.pullAt(playerArray, index)
      lineup.players = playerArray
      return lineup.parent().save()
    })
    .then(lineup => res.sendStatus(204))
    .catch(next)
})

router.patch('/lineup/:id/active', requireToken, (req, res, next) => {
  const id = req.params.id
  const inputLineup = req.body.lineup
  const user = req.user
  User.findById(user)
    .then((user) => {
      const lineup = user.lineup.id(id)
      lineup.active = inputLineup.active
      return lineup.parent().save()
    })
    .then(lineup => res.sendStatus(204))
    .catch(next)
})

module.exports = router

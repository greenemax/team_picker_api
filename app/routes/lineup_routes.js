const express = require('express')
// const Lineup = require('../models/lineup')
const User = require('../models/user')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const passport = require('passport')
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// INDEX
// GET all lineups listed to the user
router.get('/lineups/', requireToken, (req, res, next) => {
  User.findById(req.user.id)
    .then(handle404)
    .then(user => {
      console.log(user.lineups)
      return user.lineups
    })
    .then(lineups => res.status(200).json({ lineup: lineups.toObject() }))
    .catch(next)
})

// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
router.get('/lineups/:id', requireToken, (req, res, next) => {
  User.findById(req.user.id)
    .then(handle404)
    .then((user) => {
      const line = user.lineups.filter(lineup => {
        return lineup._id === req.params.id
      })
      return line
    })
    .then(lineup => res.status(200).json({ lineup: lineup.toObject() }))
    .catch(next)
})

// CREATE
// POST /examples
router.post('/lineups/', requireToken, (req, res, next) => {
  const lineup = req.body.lineup
  User.findById(req.user._id)
    .then(handle404)
    .then(user => {
      user.lineups.push(lineup)
      return user.save()
    })
    .then(user => res.status(201).json({ user: user.toObject() }))
    .catch(next)
})

// UPDATE
// PATCH /examples/5a7db6c74d55bc51bdf39793
router.patch('/lineups/:id', removeBlanks, requireToken, (req, res, next) => {
  const lineup = req.body.lineup
  User.findById(req.user._id)
    .then(handle404)
    .then(user => {
      console.log(user.lineup)
      user.lineups.id(req.params.id).set(lineup)
      return user.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/lineups/:id', requireToken, (req, res, next) => {
  User.findById(req.user.id)
    .then(handle404)
    .then((user) => {
      user.lineups.id(req.params.id).remove()
      user.save()
    })
    //   return line
    // })
    // .then(lineup => {
    //   console.log(line)
    //   lineup.remove()
    // })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router

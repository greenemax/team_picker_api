const express = require('express')
const User = require('./../models/user')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
// const removeBlanks = require('../../lib/remove_blank_fields')
const router = express.Router()
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })
const deepIndexOf = require('../../lib/deep_indexOf')
const lodash = require('lodash')

// GET all movies, this shows all the movies that are listed to the user
router.get('/lineup/', requireToken, (req, res, next) => {
  User.findById(req.user)
    .populate('lineup.players')
    .then(handle404)
    .then(user => {
      console.log(user)
      return user.lineup
    })
    .then(lineups => res.status(200).json({ lineups: lineups.toObject() }))
    .catch(next)
})

router.get('/lineup/:id', requireToken, (req, res, next) => {
  // get the movie ID from the params
  const id = req.params.id
  console.log(id)
  // get the user thanks to requireToken
  const user = req.user
  console.log(user)
  // find the user's movie
  // return the movie
  User.findOne(user)
    .then(handle404)
    .then(user.lineups.id(id).populate('players'))
    .then(lineup => res.status(200).json({ lineup: lineup.toObject() }))
    .catch(next)
})

router.patch('/lineup', requireToken, (req, res, next) => {
  const lineup = req.body.lineup
  const user = req.user
  User.findById(user)
    .then(user => {
      user.lineups.push(lineup)
      return user.save()
    })
    // making sure the request returns the Lineup
    .then(currUser => res.status(201).json({ lineup: currUser.lineup.toObject() }))
    .catch(next)
})

// add player to lineup
router.patch('/shopping-cart/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  const player = req.body.player
  const user = req.user
  User.findById(user)
    .then((user) => {
      const lineup = user.lineup.id(id) // returns a matching subdocument
      console.log(user.shoppingCarts)
      lineup.player.push(player._id) // updates the address while keeping its schema
      return user.save() // saves document with subdocuments and triggers validation
    })
    .then(lineup => res.sendStatus(204))
    .catch(next)
})

router.patch('/shopping-cart/:id/products', requireToken, (req, res, next) => {
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
      // console.log(shoppingCart.products)
      // user.shoppingCarts.products = newProducts
      // console.log(user.shoppingCarts.products)
      return lineup.parent().save()
    })
    .then(shoppingCart => res.sendStatus(204))
    .catch(next)
})

router.patch('/lineup/:id/active', requireToken, (req, res, next) => {
  const id = req.params.id
  const inputCart = req.body.lineup
  const user = req.user
  User.findById(user)
    .then((user) => {
      const lineup = user.lineup.id(id)
      lineup.active = inputCart.active
      return lineup.parent().save()
    })
    .then(lineup => res.sendStatus(204))
    .catch(next)
})

module.exports = router

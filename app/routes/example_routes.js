// const express = require('express')
// const User = require('./../models/user')
// // const { Lineup } = require('./../models/lineup')
// const customErrors = require('../../lib/custom_errors')
// const handle404 = customErrors.handle404
// // const requireOwnership = customErrors.requireOwnership
// // const removeBlanks = require('../../lib/remove_blank_fields')
// const router = express.Router()
// const passport = require('passport')
// const requireToken = passport.authenticate('bearer', { session: false })
// // const deepIndexOf = require('../../lib/deep_indexOf')
// // const lodash = require('lodash')
//
// // GET all lineups listed to the user
// router.get('/lineups/', requireToken, (req, res, next) => {
//   User.findById(req.user.id)
//     .then(handle404)
//     .then(user => {
//       console.log(user)
//       return user.lineups
//     })
//     .then(lineups => res.status(200).json({ lineup: lineups }))
//     .catch(next)
// })
//
// // Show a lineup
// router.get('/lineup/:id/', requireToken, (req, res, next) => {
//   User.findById(req.user)
//     .populate('lineup.players')
//     .then(handle404)
//     .then(user => {
//       return user.lineups.id(req.params.id)
//     })
//     .then(lineup => res.status(200).json({ lineup: lineup.toObject() }))
//     .catch(next)
// })
//
// // delete a lineup
// router.delete('/lineups/:id', requireToken, (req, res, next) => {
//   User.findById(req.user._id)
//     .then(handle404)
//     .then(user => {
//       user.lineups.id(req.params.id).remove()
//       user.save()
//     })
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })
//
// // create a lineup
// router.post('/lineups/', requireToken, (req, res, next) => {
//   const lineup = req.body.lineup
//   User.findById(req.body._id)
//     .then(handle404)
//     .then(user => {
//       user.lineups.push(lineup)
//       return user.save()
//     })
//     .then(user => res.status(201).json({ user: user.toObject() }))
//     .catch(next)
// })
//
// // update a lineup
// router.patch('/lineups/:id', removeBlanks, requireToken, (req, res, next) => {
//   Player.findById(req.params.id)
//     .then(handle404)
//     .then(player => {
//       return player.updateOne(req.body.player)
//     })
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })
//
//
// // // add player to lineup
// // router.patch('/lineup/:lineupId', requireToken, (req, res, next) => {
// //   const lineupAddId = req.params.lineupId
// //   const player = req.body.player.playerId
//
// //   const user = req.user
// //   const playerId = req.user.lineups.id(lineupAddId).players
// //   Lineup.findById(lineupAddId)
// //     .then((lineups) => {
//
// //       playerId.push(player)
// //       return user.save()
// //     })
// //     .then(lineup => res.sendStatus(204))
// //     .catch(next)
// // })
// //
// // router.patch('/lineups/:lineupId/players/:playerId', requireToken, (req, res, next) => {
// //   const lineupId = req.params.id
// //   const player = req.body.player.playerId
//
// //   const user = req.user
// //   const playerId = req.user.lineups.id(lineupId).players
// //   Lineup.findById(lineupId)
// //     .then((lineups) => {
// //       playerId.players.id(playerId).remove(player)
// //       return user.save()
// //     })
// //     .then(lineup =>
// //       res.sendStatus(204))
// //     .catch(next)
// // })
// //
// // router.patch('/lineup/:id/active', requireToken, (req, res, next) => {
// //   const id = req.params.id
// //   const inputLineup = req.body.lineup
// //   const user = req.user
// //   User.findById(user)
// //     .then((user) => {
// //       const lineup = user.lineup.id(id)
// //       lineup.active = inputLineup.active
// //       return lineup.parent().save()
// //     })
// //     .then(lineup => res.sendStatus(204))
// //     .catch(next)
// // })
//
// module.exports = router

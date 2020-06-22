const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const Product = require('./product')
// const User = require('./user')

const lineupSchema = new Schema({
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
  date: {
    type: Date
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true }
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

lineupSchema.virtual('fullTeam').get(function () {
  let pickedPlayers = 0
  if (this.players.length === 0) {
    return pickedPlayers
  } else {
    for (let i = 0; i < 5; i++) {
      pickedPlayers += this.players[i].pickedPlayers
    }
    return pickedPlayers
  }
})

const Lineup = mongoose.model('Lineup', lineupSchema)

module.exports = {
  lineupSchema,
  Lineup
}

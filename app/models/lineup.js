const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lineupSchema = new Schema({
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
  name: {
    type: String
    // required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
    // required: true
  }
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

lineupSchema.virtual('totalCost').get(function () {
  let cost = 0
  if (this.players.length === 0) {
    return cost
  } else {
    for (let i = 0; i < this.players.length; i++) {
      cost += this.players[i].cost
    }
    return cost
  }
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

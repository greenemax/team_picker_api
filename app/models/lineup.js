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
  },
  active: {
    type: Boolean
  }
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

const Lineup = mongoose.model('Lineup', lineupSchema)

module.exports = {
  lineupSchema,
  Lineup
}

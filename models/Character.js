const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name']
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: 'Game'
  }
});

module.exports = mongoose.model('Character', CharacterSchema);

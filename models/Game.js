const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ['World of Warcraft', 'Final Fantasy XIV', 'Black Desert Online']
  }
});

module.exports = mongoose.model('Game', GameSchema);

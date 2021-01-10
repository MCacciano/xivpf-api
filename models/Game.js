const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ['World of Warcraft', 'Final Fantasy XIV']
  }
});

module.export = mongoose.model('Game', GameSchema);

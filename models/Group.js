const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxLength: [50, 'Can not be longer than 50 characters']
  },
  slug: String,
  game: {
    type: String,
    enum: ['World of Warcraft', 'Final Fantasy XIV', 'Black Desert Online'],
    default: '',
    required: false
  }
});

module.exports = mongoose.model('Group', GroupSchema);

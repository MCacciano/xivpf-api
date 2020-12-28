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
  slug: String
});

module.exports = mongoose.model('Group', GroupSchema);

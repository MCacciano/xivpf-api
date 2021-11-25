const mongoose = require('mongoose');
const slugify = require('slugify');

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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Create group slug from the name
GroupSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});

module.exports = mongoose.model('Group', GroupSchema);

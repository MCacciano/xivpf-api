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
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: 'Game'
  },
  isPug: {
    type: Boolean,
    required: false,
    default: false
  },
  isStatic: {
    type: Boolean,
    required: false,
    default: false
  }
});

// Create group slug from the name
GroupSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });

  // on initial creation the creator gets set to the first owner
  this.creator = this.owner;
  next();
});

module.exports = mongoose.model('Group', GroupSchema);

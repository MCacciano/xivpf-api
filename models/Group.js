const mongoose = require('mongoose');
const slugify = require('slugify');
const User = require('../models/User');

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
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  description: String,
  progType: {
    type: String,
    enum: ['Casual', 'Midcore', 'Hardcore']
  }
});

// Create group slug from the name
GroupSchema.pre('save', async function (next) {
  this.slug = slugify(this.name, { lower: true });
  this.members = [this.owner];

  const user = await User.findById(this.owner);
  await User.findByIdAndUpdate(
    this.owner,
    { groups: [...user.groups, this._id] },
    {
      new: true,
      runValidators: true
    }
  );

  next();
});

module.exports = mongoose.model('Group', GroupSchema);

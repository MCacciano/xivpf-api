const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const Group = require('../models/Group');

const joinGroup = async (group, groupId, userId) => {
  return await Group.findByIdAndUpdate(
    groupId,
    { members: [...group.members, userId] },
    {
      new: true,
      runValidators: true
    }
  );
};

const leaveGroup = async (group, groupId, userId) => {
  return await Group.findByIdAndUpdate(
    groupId,
    { members: group.members.filter(id => id !== userId) },
    {
      new: true,
      runValidators: true
    }
  );
};

// @desc      Get all groups
// @route     GET /api/v1/groups
// @access    Public
exports.getGroups = asyncHandler(async (req, res, next) => {
  const groups = await Group.find(req.query).populate(`members`, `name`);

  res.status(200).json({ success: true, data: groups, count: groups.length });
});

// @desc      Get single group
// @route     GET /api/v1/groups/:id
// @access    Public
exports.getGroup = asyncHandler(async (req, res, next) => {
  const group = await Group.findById(req.params.id);

  if (!group) {
    return next(new ErrorResponse(`Group not found with ID of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: group });
});

// @desc      Create new group
// @route     POST /api/v1/groups
// @access    Private
exports.createGroup = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  // check if user already has a group created
  const publishedGroup = await Group.findOne({ owner: req.user.id });

  if (publishedGroup) {
    return next(new ErrorResponse(`The user with ID ${req.user.id} has already created a group.`));
  }

  const group = await Group.create({ ...req.body, owner: req.user.id });

  res.status(201).json({ success: true, data: group });
});

// @desc      Update group
// @route     PUT /api/v1/groups/:id
// @access    Private
exports.updateGroup = asyncHandler(async (req, res, next) => {
  let group = await Group.findById(req.params.id);
  let body;

  if (!group) {
    return next(new ErrorResponse(`Group not found with ID of ${req.params.id}`, 404));
  }

  // Make sure user is Group owner
  if (group.owner.toString() === req.user.id) {
    body = req.body;
  } else {
    if (group.members.includes(req.user.id)) {
      console.log('leave', group.members);
      console.log(`req.user.id`, req.user.id);
      const tester = group.members.filter(member => member !== req.user.id)
      console.log(`tester`, tester)
      body = { members: tester };
    } else {
      console.log('join');
      body = { members: [...group.members, req.user.id] };
    }
  }

  group = await Group.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: group });
});

// @desc      Delete group
// @route     DELETE /api/v1/groups/:id
// @access    Private
exports.deleteGroup = asyncHandler(async (req, res, next) => {
  const group = await Group.findByIdAndDelete(req.params.id);

  if (!group) {
    return next(new ErrorResponse(`Group not found with ID of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: {} });
});

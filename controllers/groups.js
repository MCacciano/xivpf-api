const Group = require('../models/Group');
const asyncHandler = require('../middleware/async');

// @desc      Get all groups
// @route     GET /api/v1/groups
// @access    Public
exports.getGroups = asyncHandler(async (req, res, next) => {
  const groups = await Group.find();

  res.status(200).json({ success: true, data: groups, count: groups.length });
});

// @desc      Get single group
// @route     GET /api/v1/groups/:id
// @access    Public
exports.getGroup = asyncHandler(async (req, res, next) => {
  const group = await Group.findById(req.params.id);

  if (!group) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({ success: true, data: group });
});

// @desc      Create new group
// @route     POST /api/v1/groups
// @access    Private
exports.createGroup = asyncHandler(async (req, res, next) => {
  const group = await Group.create(req.body);

  res.status(201).json({ success: true, data: group });
});

// @desc      Update group
// @route     PUT /api/v1/groups/:id
// @access    Private
exports.updateGroup = asyncHandler(async (req, res, next) => {
  const group = await Group.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!group) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({ success: true, data: group });
});

// @desc      Delete group
// @route     DELETE /api/v1/groups/:id
// @access    Private
exports.deleteGroup = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: `Delete group with the id ${req.params.id}` });
});

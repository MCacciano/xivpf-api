const Group = require('../models/Group');
const asyncHandler = require('../middleware/async');

// @desc      get all groups
// @route     GET /api/v1/groups
// @access    public
exports.getGroups = asyncHandler(async (req, res, next) => {
  const groups = await Group.find();

  res.status(200).json({ success: true, data: groups, count: groups.length });
});

const express = require('express');
const {
  getGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup
} = require('../controllers/groups');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/').get(getGroups).post(protect, createGroup);
router.route('/:id').get(getGroup).put(protect, updateGroup).delete(protect, deleteGroup);

module.exports = router;

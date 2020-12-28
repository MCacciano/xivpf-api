const express = require('express');
const { getGroups } = require('../controllers/groups');

const router = express.Router();

router.route('/').get(getGroups);

module.exports = router;

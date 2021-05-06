//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();

const searchController = require('../controllers/search');

router.get('/',searchController.getProductSearch);

module.exports = router;
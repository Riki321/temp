const express = require('express');
const router = express.Router();
const recourseController = require('../controllers/resourceController');

router.post("/",recourseController.Resource_post);

module.exports = router;
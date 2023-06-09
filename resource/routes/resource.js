const express = require('express');
const router = express.Router();
const recourseController = require('../controllers/resourceController');
const composeController = require('../controllers/composeController');



router.get("/:id",recourseController.Resource_get);
router.get("/",recourseController.Resource_get_all);
router.get("/compose",composeController.compose_get);
// router.put("/:id",recourseController.Resource_put);
// router.delete("/",recourseController.Resource_delete);
module.exports = router;
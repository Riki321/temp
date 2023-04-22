const express = require('express');
const router = express.Router();
const admin_recourseController = require('../controllers/resourceController');
const is_admin=require('../config/auth.js').isAdmin;


// router.get("/:id",recourseController.Resource_get);
router.get("/",admin_recourseController.Resource_get_all);
router.get("/compose",is_admin,admin_recourseController.compose_get);
router.post("/compose",is_admin,admin_recourseController.compose_post);
// router.put("/:id",recourseController.Resource_put);
// router.delete("/",recourseController.Resource_delete);
module.exports = router;
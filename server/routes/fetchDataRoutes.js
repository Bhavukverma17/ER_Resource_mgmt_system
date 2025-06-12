// routes/fetchDataRoutes.js
const express = require('express');
const router = express.Router();
const { getAllEngineers , assignProjectToEngineer , unassignProjectFromEngineer} = require('../controllers/engineerController');
const {getAllProjects} = require('../controllers/projectController')
// GET /api/engineers
router.get('/engineers', getAllEngineers);
router.get('/projects',getAllProjects)

router.put('/assign/:id', assignProjectToEngineer);
router.put('/unassign/:id', unassignProjectFromEngineer);
module.exports = router;

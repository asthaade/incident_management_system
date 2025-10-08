const express = require('express');
const router = express.Router();
const {
  createIncident,
  getUserIncidents,
  updateIncident,
  getIncidentById,
} = require('../controllers/incidentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createIncident).get(protect, getUserIncidents);
router.route('/:id').get(protect, getIncidentById).put(protect, updateIncident);

module.exports = router;
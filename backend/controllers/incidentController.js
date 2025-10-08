const Incident = require('../models/incidentModel');
const generateIncidentId = require('../utils/generateIncidentId');

const createIncident = async (req, res) => {
  const { details, priority } = req.body;

  const incidentId = await generateIncidentId();

  const incident = new Incident({
    incidentId,
    details,
    priority,
    reporter: req.user._id, // from protect middleware
  });

  const createdIncident = await incident.save();
  res.status(201).json(createdIncident);
};

const getUserIncidents = async (req, res) => {
  const incidents = await Incident.find({ reporter: req.user._id }).sort({ createdAt: -1 });
  res.json(incidents);
};

const getIncidentById = async (req, res) => {
  const incident = await Incident.findById(req.params.id);

  if (incident && incident.reporter.toString() === req.user._id.toString()) {
    res.json(incident);
  } else {
    res.status(404).json({ message: 'Incident not found or not authorized' });
  }
};

const updateIncident = async (req, res) => {
  const { details, priority, status } = req.body;
  const incident = await Incident.findById(req.params.id);

  if (!incident || incident.reporter.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Incident not found or not authorized' });
  }

  if (incident.status === 'Closed') {
    return res.status(400).json({ message: 'Cannot edit a closed incident' });
  }

  incident.details = details || incident.details;
  incident.priority = priority || incident.priority;
  incident.status = status || incident.status;

  const updatedIncident = await incident.save();
  res.json(updatedIncident);
};

module.exports = { createIncident, getUserIncidents, updateIncident, getIncidentById };
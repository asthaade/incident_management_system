const Incident = require('../models/incidentModel');

const generateIncidentId = async () => {
  const year = new Date().getFullYear();
  let incidentId;
  let isUnique = false;

  while (!isUnique) {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    incidentId = `FW${randomNum}${year}`;
    const existingIncident = await Incident.findOne({ incidentId });
    if (!existingIncident) {
      isUnique = true;
    }
  }
  return incidentId;
};

module.exports = generateIncidentId;
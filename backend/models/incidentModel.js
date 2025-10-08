const mongoose = require('mongoose');

const incidentSchema = mongoose.Schema(
  {
    incidentId: { type: String, required: true, unique: true },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    details: { type: String, required: true },
    priority: {
      type: String,
      required: true,
      enum: ['High', 'Medium', 'Low'],
    },
    status: {
      type: String,
      required: true,
      enum: ['Open', 'In Progress', 'Closed'],
      default: 'Open',
    },
  },
  { timestamps: true }
);

const Incident = mongoose.model('Incident', incidentSchema);
module.exports = Incident;
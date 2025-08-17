const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  general: Object,
  cancerScreening: Object,
  cardiovascular: Object,
  fitness: Object,
  genetics: Object,
  bodyComposition: Object,
  hormones: Object,
  nutrition: Object,
  brain: Object,
  skin: Object,
  extendedCare: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HealthData', healthDataSchema);

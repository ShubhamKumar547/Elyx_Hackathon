exports.getHealthData = (req, res) => {
  // Example health data
  const healthData = {
    general: {
      clinicalHistory: 'Completed',
      physicalExam: 'Normal',
      vitalSigns: { bp: '120/80', hr: 72, bmi: 22.5 },
    },
    cancerScreening: {
      colorectal: 'FIT negative',
      cervical: 'HPV negative',
      breast: 'Mammogram normal',
    },
    cardiovascular: {
      ecg: 'Normal',
      calciumScore: 'Low risk',
      echocardiogram: 'Normal',
      cimt: 'Normal',
    },
    fitness: {
      vo2max: 'Excellent',
      gripStrength: 'Good',
      fms: 'No issues',
      spirometry: 'Normal',
    },
    genetics: {
      hereditaryRisk: 'Low',
      pharmacogenomics: 'No issues',
    },
    bodyComposition: {
      dexa: 'Healthy',
    },
    hormones: {
      thyroid: 'Normal',
      sexHormones: 'Normal',
    },
    nutrition: {
      micronutrients: 'Optimal',
      allergies: 'None',
      gutMicrobiome: 'Healthy',
    },
    brain: {
      cognitive: 'Normal',
      mentalHealth: 'Stable',
      mri: 'No issues',
    },
    skin: {
      visia: 'Healthy',
    },
    extendedCare: {
      consultation: 'Completed',
      lifestyle: 'Recommendations provided',
    },
  };
  res.json(healthData);
};

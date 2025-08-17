// Example health data for dashboard visualizations
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

export const COLORS = [
  "#82ca9d", // green
  "#2193b0", // blue
  "#6dd5ed", // light blue
  "#f7b731", // yellow/gold
  "#fd5c63", // coral/red
];

export default healthData;



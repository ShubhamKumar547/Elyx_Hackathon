const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Dummy data imports (replace with actual data sources as needed)
const USERS = require("../Data/user");
const TRENDS = require("../Data/wellness.json");
const INTERNAL_METRICS = require("../Data/internalMetrics.json");
const PERSONA_DETAILS = require("../Data/personaAnalysis");


// /data/healthIds - Get mock health ID data for dropdown
router.get("/healthIds", authMiddleware, (req, res) => {
  // Example mock data, replace with actual data source if needed
  const healthIds = [
    { id: "HID-78945612", name: "Rohan Sharma" },
    { id: "HID-12345678", name: "Priya Singh" },
    { id: "HID-87654321", name: "Amit Verma" },
    { id: "HID-11223344", name: "Neha Gupta" },
  ];
  res.json({ success: true, data: healthIds });
});

// /data/users - Get user data
router.get("/users", authMiddleware, (req, res) => {
  if (USERS) {
    res.json({ success: true, data: USERS });
  } else {
    res.json({ success: false, message: "No user data found." });
  }
});

// /data/trend - Get trend data
router.get("/trend", authMiddleware, (req, res) => {
  if (TRENDS) {
    res.json({ success: true, data: TRENDS });
  } else {
    res.json({ success: false, message: "No trend data found." });
  }
});

// /data/internalMetrics - Get internal metrics data
router.get("/internalMetrics", authMiddleware, (req, res) => {
  if (INTERNAL_METRICS) {
    res.json({ success: true, data: INTERNAL_METRICS });
  } else {
    res.json({ success: false, message: "No internal metrics data found." });
  }
});

// /data/personaDetails - Get persona details data
router.get("/personaDetails", authMiddleware, (req, res) => {
  if (PERSONA_DETAILS) {
    res.json({ success: true, data: PERSONA_DETAILS });
  } else {
    res.json({ success: false, message: "No persona details found." });
  }
});

module.exports = router;

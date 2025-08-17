const express = require('express');
const router = express.Router();
const { processPipeline } = require('../controllers/pipelineController');

// POST endpoint to process pipeline data
router.post('/processCallsQuestions', processPipeline);

module.exports = router;

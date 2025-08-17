const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch').default;
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + GEMINI_API_KEY;

function simplifyDecisions(decisions) {
  return decisions.map(d => ({
    id: d.id,
    date: d.date,
    decision: d.decision,
    reason: d.reason
  }));
}

async function processPipeline(req, res) {
  try {
    const filePath = path.join(__dirname, './rohan.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData);
    const question = req.body.question || '';
    const decisions = data.decisions || [];
    const simplifiedDecisions = simplifyDecisions(decisions);
    const decisionsJson = JSON.stringify(simplifiedDecisions);
    const context = `Member decisions data as JSON array: ${decisionsJson}\n\nQuestion: ${question} &  Answer the question in about 80 word only`;

    // Gemini API call
    const geminiResponse = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: context }] }]
      })
    });
    const geminiData = await geminiResponse.json();
    let answer = '';
    if (geminiData && geminiData.candidates && geminiData.candidates[0] && geminiData.candidates[0].content && geminiData.candidates[0].content.parts[0].text) {
      answer = geminiData.candidates[0].content.parts[0].text;
      console.log('Gemini API success:', answer);
    } else {
      answer = JSON.stringify(geminiData);
      console.log('Gemini API response (no answer):', answer);
    }
    res.json({ success: true, answer });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { processPipeline };

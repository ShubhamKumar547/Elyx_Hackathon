const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const connectDB = require('./models/db');
// const User = require('./models/User');
// const HealthData = require('./models/HealthData');

const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');
const pipelineRoutes = require('./routes/pipeline');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
// const mongoURI = process.env.MONGO_URI || 'YOUR_MONGODB_ATLAS_URL_HERE';
// connectDB(mongoURI);

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/pipeline', pipelineRoutes);

app.get('/', (req, res) => {
	res.send('Elyx Health API is running');
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
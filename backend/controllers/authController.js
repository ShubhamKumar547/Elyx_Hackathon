const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'elyx_secret';
const User = require('../models/User');

exports.register = async (req, res) => {
  const { username, password, email, name, mobile, healthId } = req.body;
  if (!username || !password || !email || !name || !mobile || !healthId) {
    return res.status(400).json({ message: 'All fields required' });
  }
  try {
    const existingUser = await User.findOne({ $or: [ { username }, { email } ] });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const user = new User({ username, password, email, name, mobile, healthId });
    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username: user.username, email: user.email }, SECRET, { expiresIn: '2h' });
  res.json({ token });
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

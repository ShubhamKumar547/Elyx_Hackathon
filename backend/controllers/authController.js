const { LOGIN_DETAILS } = require("../Data/loginDetails");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginUser = (req, res) => {
  const { username, password } = req.body;

  // Find user by username and password
  const user = LOGIN_DETAILS.admins.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // Generate JWT token
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "20m" }
    );
    // Login successful
    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } else {
    // Login failed
    res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }
};

module.exports = { loginUser };

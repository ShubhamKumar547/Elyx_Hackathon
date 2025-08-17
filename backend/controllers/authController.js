const { LOGIN_DETAILS } = require("../Data/loginDetails");

const loginUser = (req, res) => {
  const { username, password } = req.body;

  // Find user by username and password
  const user = LOGIN_DETAILS.admins.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // Login successful
    res.json({
      success: true,
      message: "Login successful",
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

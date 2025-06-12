// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  encryptedPassword = await bcrypt.hash(password, 10),
  console.log(email, password);

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    console.log(user , "user object from db");
    console.log("object", encryptedPassword);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    
    const token = `fake-jwt-token-for-${user.email}`;

    return res.status(200).json({
      message: 'Login successful',
      user: {
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { loginUser };

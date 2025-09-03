const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SignUp = require("../Model/SingUpSchema");

// Secret key for JWT (use environment variable in production)
const JWT_SECRET = "g7vbj^*&^*&^24gfoiwrbgG";

const signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      mobileNumber,
      email,
      address,
      role,
      password,
    } = req.body;

    // 1. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

    // 2. Save user with hashed password
    const result = await SignUp.create({
      firstName,
      lastName,
      mobileNumber,
      email,
      address,
      role,
      password: hashedPassword,
    });

    if (!result) {
      return res.status(400).json({ message: "Unsuccessful signup" });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { id: result._id, email: result.email, role: result.role },
      JWT_SECRET,
      { expiresIn: "1h" } // token expires in 1 hour
    );

    res.status(201).json({
      message: "Successfully signed up",
      token,
    });
  } catch (error) {
    // handle duplicate key error
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Email or Mobile already exists" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signUp };

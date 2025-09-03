const bcrypt = require("bcrypt");

const SignUp = require("../Model/SingUpSchema");
const jwt = require("jsonwebtoken");

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

    res.status(201).json({
      message: "Successfully signed up",
    });
  } catch (error) {
    
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Email or Mobile already exists" });
    }
    res.status(500).json({ error: error.message });
  }
};

const signIn = async(req,res) => {
  try {
    const {email,password} = req.body
     const user  = await SignUp.findOne({email})
      if (!user) {
      return  res.status(400).json({ message: "Invalid email or password" })
      }

      const isMatch = await bcrypt.compare(password,user.password)

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" })
      }

      const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      JWT_SECRET, // use process.env.JWT_SECRET in real projects
      { expiresIn: "1h" }
    );

     res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

module.exports = { signUp ,signIn};

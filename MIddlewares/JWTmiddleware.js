

// 3. Generate JWT token
const token = jwt.sign(
  { id: result._id, email: result.email, role: result.role },
  JWT_SECRET,
  { expiresIn: "1h" } // token expires in 1 hour
);

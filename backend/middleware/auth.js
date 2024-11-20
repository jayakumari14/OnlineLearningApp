const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    // Split the token and get the part after "Bearer "
    // const actualToken = token.split(" ")[1]; // Assuming it's in the form "Bearer <token>"

    // Verify the token
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); // splitting the token from 'Bearer <token>'
    req.user = verified; // Store verified user info in request

    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;

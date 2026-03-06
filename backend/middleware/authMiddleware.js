import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; 
    next(); 
  } catch (err) {
    res.status(403).json({ message: "Invalid or Expired Token" });
  }
};
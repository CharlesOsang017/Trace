import User from "../models/user.model";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Provide the auth token to continue" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);

    if (!decoded) {
      return res.status(401).json({ message: "invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    req.user = user;
    next()
  } catch (error) {
    console.log("error from protectRoute middleware", error.message);
    return res.status(500).json({ message: error.message });
  }
 
};

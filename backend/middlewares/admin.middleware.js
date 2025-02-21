export const admin = async (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
  } catch (error) {
    console.log("error in admin middleware", error.message);
    return res.status(500).json({ message: error.message });
  }
};

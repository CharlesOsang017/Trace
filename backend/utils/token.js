import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return new Promise((resolve, reject) => {
    const payload = {user };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "48h" },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    );
  });
};

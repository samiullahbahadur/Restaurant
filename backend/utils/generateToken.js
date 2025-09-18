import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
// const JWT_EXPIRES_IN = "1d"; // token expiration

// export const generateToken = (payload) => {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
// };

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, name: user.firstname },
    process.env.JWT_SECRET,
    { expiresIn: "1d" } // 30 days
  );
};

export default generateToken;

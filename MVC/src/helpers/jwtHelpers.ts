import jwt, { JwtPayload } from "jsonwebtoken";

// create token
const createToken = (jwtPayload: JwtPayload, secret: string, options: { expiresIn: string }) => {
  return jwt.sign(jwtPayload, secret, options);
};

// verify token
const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};

export const JWTHelpers = {
  createToken,
  verifyToken,
};

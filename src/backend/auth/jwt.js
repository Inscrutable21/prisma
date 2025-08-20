import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.JWT_SECRET;

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

export const generateAccessToken = (payload) => {
  if (!secretKey) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }
  return jwt.sign(
    { userId: payload.userId, email: payload.email },
    secretKey,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
};

export const generateRefreshToken = (payload) => {
  if (!secretKey) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }
  return jwt.sign(
    { userId: payload.userId, tokenType: 'refresh' },
    secretKey,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
};

export const verifyToken = (token) => {
  if (!secretKey) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Token is invalid or has expired.');
  }
};
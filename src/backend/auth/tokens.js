import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Store a refresh token in the database
export const storeRefreshToken = async (userId, token) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
  return prisma.token.create({
    data: {
      token,
      userId: userId,
      expiresAt: expiresAt
    }
  });
};

// Find a refresh token in the database
export const findRefreshToken = async (token) => {
  return prisma.token.findUnique({
    where: { token },
    include: { user: true }
  });
};

// Delete a refresh token from the database
export const deletetoken = async (token) => {
  return prisma.token.delete({
    where: { token }
  });
};
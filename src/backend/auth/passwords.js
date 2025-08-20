import bcrypt from "bcryptjs";
const saltRounds = 12;

// Hash a plain-text password for user registration
export const hashPassword = async (plainPassword) => {
  try {
    return await bcrypt.hash(plainPassword, saltRounds);
  } catch (error) {
    throw new Error('Password hashing failed.');
  }
};

// Compare a plain-text password with a hashed password for login
export const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new Error('Password comparison failed.');
  }
};
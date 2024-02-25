import bcrypt from "bcrypt";
import config from "../config";

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
};
const comparePassword = async (plainTextPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const passwordHelpers = {
  hashPassword,
  comparePassword,
};

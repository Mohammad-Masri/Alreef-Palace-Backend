import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hPassword = await bcrypt.hash(password, salt);
  return hPassword;
};

export const isPasswordMatch = async (
  plain_password: string,
  hashed_password: string,
) => {
  return await bcrypt.compare(plain_password, hashed_password);
};

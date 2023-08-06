import bcrypt from 'bcrypt';

export const hashData = async (data: string) => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(data, salt);
};

export const compareData = (data: string, hashedData: string) => {
  return bcrypt.compare(data, hashedData);
};

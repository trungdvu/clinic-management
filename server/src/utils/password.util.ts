import bcrypt from "bcrypt";

export const comparePassword = (
  rawPassword: string,
  hashedPassword: string
): Promise<boolean> =>
  new Promise((resolve, reject) => {
    bcrypt.compare(
      rawPassword,
      hashedPassword,
      (error: Error, data: boolean) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(data);
        }
      }
    );
  });

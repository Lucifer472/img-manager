import { db } from "@/lib/db";

export const getEmailTokenbyEmail = async (email: string) => {
  try {
    const token = await db.verifyEmail.findFirst({
      where: {
        email,
      },
    });

    if (!token) return null;

    return token;
  } catch (error) {
    return null;
  }
};

export const getEmailTokenbyToken = async (token: string) => {
  try {
    const emailToken = await db.verifyEmail.findUnique({
      where: {
        token,
      },
    });

    if (!emailToken) return null;

    return emailToken;
  } catch (error) {
    return null;
  }
};

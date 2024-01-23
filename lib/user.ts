import { db } from "@/lib/db";

export const getUserbyEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserbyId = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return user;
  } catch (error) {
    return null;
  }
};

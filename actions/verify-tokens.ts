"use server";

import { db } from "@/lib/db";
import { getEmailTokenbyToken } from "@/lib/email-token";
import { getUserbyEmail } from "@/lib/user";

export const verifyEmailToken = async (token: string) => {
  const existToken = await getEmailTokenbyToken(token);

  if (existToken === null) return { error: "Token is not Valid!" };

  if (existToken.expires < new Date()) {
    return { error: "Token has Expired!" };
  }

  const user = await getUserbyEmail(existToken.email);

  if (!user) return { error: "No User Found for Token" };

  try {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: new Date(),
      },
    });
    return { success: "Token has been Verified!" };
  } catch (error) {
    return { error: "Something went Wrong!" };
  }
};

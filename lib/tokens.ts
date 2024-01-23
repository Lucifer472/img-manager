import { v4 as uuid } from "uuid";
import { getEmailTokenbyEmail } from "./email-token";
import { db } from "@/lib/db";

export const genEmailToken = async (email: string) => {
  const token = uuid();

  const expires = new Date(new Date().getTime() + 1800 * 1000);

  const existToken = await getEmailTokenbyEmail(email);

  if (existToken === null) {
    const newToken = await db.verifyEmail.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return newToken;
  }

  if (existToken.expires < new Date()) {
    const newToken = await db.verifyEmail.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return newToken;
  }
  return existToken;
};

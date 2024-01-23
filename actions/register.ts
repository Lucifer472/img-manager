"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schema";
import { auth } from "@/auth";

import { getUserbyEmail } from "@/lib/user";
import { db } from "@/lib/db";
import { genEmailToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (value: z.infer<typeof RegisterSchema>) => {
  const session = await auth();

  if (!session) return { error: "You are not Authorized" };

  const validateFields = RegisterSchema.safeParse(value);

  if (!validateFields.success) return { error: "Invalid Fields" };

  const { email, password, name } = validateFields.data;

  const hashed = await bcrypt.hash(password, 12);

  try {
    const isUser = await getUserbyEmail(email);

    if (isUser) return { error: "User Alredy Exists!" };

    await db.user.create({
      data: {
        email,
        password: hashed,
        name,
      },
    });

    const token = await genEmailToken(email);

    const send = await sendVerificationEmail(token.email, token.token);

    if (send) return { success: "Verification Email Sent to User!" };
    return { error: "An Error has occured!" };
  } catch (error) {
    return { error: "AN Error Ocuured" };
  }
};

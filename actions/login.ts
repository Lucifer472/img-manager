"use server";

import * as z from "zod";

import { LoginSchema } from "@/schema";
import { signIn } from "@/auth";

import { DEFAULT_LOGIN_RED } from "@/routes";
import { AuthError } from "next-auth";
import { getUserbyEmail } from "@/lib/user";
import { genEmailToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (value: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(value);

  if (!validateFields.success) return { error: "Invalid Inputs" };

  const { email, password } = validateFields.data;

  const user = await getUserbyEmail(email);

  if (!user) return { error: "No User Found!" };

  if (!user.emailVerified) {
    const token = await genEmailToken(email);

    const isSent = await sendVerificationEmail(token.email, token.token);
    if (isSent) return { success: "Email Sent Successfully" };
    return { error: "An Error Occured!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_RED,
    });

    return { success: "Login Successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Authatication Error Occured!" };
    }
    throw error;
  }
};

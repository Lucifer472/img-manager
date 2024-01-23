import type { NextAuthConfig } from "next-auth";

import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { LoginSchema } from "@/schema";
import { getUserbyEmail } from "@/lib/user";

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);

        if (!validateFields.success) return null;

        const { email, password } = validateFields.data;

        const user = await getUserbyEmail(email);
        if (!user) return null;

        if (!user.emailVerified) return null;

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) return null;
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

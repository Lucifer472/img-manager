import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please Enter a valid Email" }),
  password: z
    .string()
    .min(6, { message: "Password Must be 6 latters Long" })
    .max(12, { message: "Password is too Long!" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(3, { message: "Name is Required Field!" }),
  email: z.string().email({ message: "Please Enter a valid Email" }),
  password: z
    .string()
    .min(6, { message: "Password Must be 6 latters Long" })
    .max(12, { message: "Password is too Long!" }),
});

export const imageSchema = z.object({
  img: z.any(),
});

export const frameSchema = z.object({
  name: z.string().min(6, { message: "minimum 6 latters required" }),
  desc: z.string().min(12, { message: "minimum 6 latters required" }),
  img: z.string().min(1),
});

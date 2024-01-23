"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipLoader } from "react-spinners";

import { RegisterSchema } from "@/schema";
import { register } from "@/actions/register";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError, FormSuccess } from "@/components/messages";

export const RegisterForm = () => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(values).then((res) => {
        setError(null);
        setSuccess(null);
        if (res.error) {
          setError(res.error);
        }
        if (res.success) {
          setSuccess(res.success);
        }
      });
    });
  };

  return (
    <>
      {isPending && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] rounded-md shadow-md bg-white z-20">
          <div className="w-full min-h-[150px] h-full flex flex-col items-center justify-center gap-y-2">
            <span className="text-muted-foreground text-lg">Loading...</span>
            <ClipLoader
              color="#3671d6"
              cssOverride={{
                borderWidth: "8px",
              }}
              size={60}
            />
          </div>
        </div>
      )}
      {isPending && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black z-10 opacity-50" />
      )}
      <CardWrapper
        headerLabel="Create a New Login User!"
        backButtonHref="/contact"
        backButtonLabel="An Error Occured? Please Contact Devloper!"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="joh.doe@example.com"
                        disabled={isPending}
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        type="password"
                        placeholder="******"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
};

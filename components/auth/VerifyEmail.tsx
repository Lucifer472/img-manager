"use client";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { BeatLoader } from "react-spinners";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError, FormSuccess } from "@/components/messages";
import { verifyEmailToken } from "@/actions/verify-tokens";

const VerifyEmail = () => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  useEffect(() => {
    if (token === null) {
      router.push("/");
    }

    startTransition(() => {
      verifyEmailToken(token as string).then((res) => {
        if (res?.error) {
          setError(res.error);
        }

        if (res?.success) {
          setSuccess(res.success);
        }
      });
    });
  }, [token, router]);

  return (
    <CardWrapper
      backButtonHref="/"
      backButtonLabel="Back to login"
      headerLabel="Verify Email"
    >
      {isPending && (
        <div className="flex items-center justify-center w-full">
          <BeatLoader color="#000" />
        </div>
      )}
      <FormError message={error} />
      <FormSuccess message={success} />
    </CardWrapper>
  );
};

export default VerifyEmail;

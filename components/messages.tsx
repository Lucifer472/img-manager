import { AlertTriangleIcon, CheckCheckIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface messageProps {
  message: string | null;
}

export const FormError = ({ message }: messageProps) => {
  if (!message) return null;

  return (
    <Alert variant={"destructive"}>
      <AlertTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export const FormSuccess = ({ message }: messageProps) => {
  if (!message) return null;

  return (
    <Alert variant={"success"}>
      <CheckCheckIcon className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

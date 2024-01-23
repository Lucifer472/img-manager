"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { UploadIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";

import { uploadImage } from "@/actions/upload";

export const ImageForm = () => {
  const [file, setFile] = useState<any>(null);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const formData = useMemo(() => {
    const data = new FormData();
    data.append("img", file);
    return data;
  }, [file]);

  useEffect(() => {
    formData.append("img", file);
  }, [file, formData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0]);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    startTransition(() => {
      uploadImage(formData).then((res) => {
        if (res?.error) {
          toast.error(res.error);
        }

        if (res?.succes) {
          toast.success(res.succes);
          router.refresh();
        }
      });
    });
  };

  return (
    <div className="w-[240px] h-[240px] bg-white rounded-md shadow-md">
      <Loader isPending={isPending} />
      <div className="w-full h-full flex items-center justify-center">
        <form
          onSubmit={handleFormSubmit}
          className="max-w-[180px] flex flex-col items-center justify-center gap-y-4"
        >
          <label htmlFor="imgUpload">
            <UploadIcon className="w-8 h-8" />
          </label>
          <Input
            disabled={isPending}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="imgUpload"
            className="hidden"
            required
          />
          <Button
            disabled={isPending}
            type="submit"
            size={"sm"}
            variant={"secondary"}
            className="hover:bg-sky-400"
          >
            Upload Image
          </Button>
        </form>
      </div>
    </div>
  );
};

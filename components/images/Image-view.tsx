"use client";

import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteImage } from "@/actions/delete";

interface ImageViewProps {
  folder: string;
  imgName: string;
  url: string;
  id: number;
}

export const ImageView = ({ folder, url, imgName, id }: ImageViewProps) => {
  const [isPending, startTransition] = useTransition();
  const [dis, setDis] = useState(false);

  const router = useRouter();

  const handleDelete = (id: number, folder: string, name: string) => {
    startTransition(() => {
      deleteImage(id, folder, name).then((res) => {
        if (res?.error) {
          toast.error(res.error);
        }

        if (res?.success) {
          toast.success(res.success);
        }

        router.refresh();
      });
    });
  };

  const handleCopy = (link: string) => {
    setDis(true);
    navigator.clipboard.writeText(link);

    setTimeout(() => {
      setDis(false);
    }, 1000);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative w-[130px] h-[130px] hover:scale-110 cursor-pointer">
          <Image
            src={`https://${url}/i/${folder}/${imgName}`}
            alt="Image"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Image Editor</DialogTitle>
          <DialogDescription>Make Changes to Image.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center w-full gap-y-4">
          <div className="relative w-full max-h-[450px] min-h-[250px]">
            <Image
              src={`https://${url}/i/${folder}/${imgName}`}
              alt="Image"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant={"default"}
            disabled={dis}
            onClick={() => handleCopy(`https://${url}/i/${folder}/${imgName}`)}
          >
            Copy Link
          </Button>
          <Button
            disabled={isPending}
            variant={"destructive"}
            onClick={() => handleDelete(id, folder, imgName)}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

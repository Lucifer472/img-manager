"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { frameSchema } from "@/schema";
import { Button } from "../ui/button";
import Image from "next/image";
import { Label } from "../ui/label";
import { useEffect, useMemo, useState, useTransition } from "react";
import { uploadImage } from "@/actions/upload";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const FrameForm = () => {
  const [img, setImg] = useState<string>("/upload.jpg");
  const [file, setFile] = useState<any>(null);

  const [isPending, startTransition] = useTransition();

  const formData = useMemo(() => {
    const data = new FormData();
    data.append("img", file);
    return data;
  }, [file]);

  const router = useRouter();

  const form = useForm<z.infer<typeof frameSchema>>({
    resolver: zodResolver(frameSchema),
    defaultValues: {
      name: "",
      img: "",
      desc: "",
    },
  });

  useEffect(() => {
    formData.append("img", file);
  }, [file, formData]);

  useEffect(() => {
    startTransition(() => {
      uploadImage(formData, "frames").then((res) => {
        if (res?.error) {
          toast.error(res.error);
        }

        if (res?.succes) {
          toast.success(res.succes);
          setImg(`https://img.missiongujarat.in/i/frames/${file.name}`);
          router.refresh();
        }
      });
    });
  }, [file, formData, router]);

  useEffect(() => {
    form.setValue("img", img);
  }, [img, form]);

  const frameSubmit = async (values: z.infer<typeof frameSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(frameSubmit)}
        className="flex flex-col items-center gap-y-6 w-full p-4"
      >
        <div className="space-y-4 w-full">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter Frame Name...."
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="desc"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter Frame Description...."
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full">
            <Input
              disabled={isPending}
              type="file"
              id="frame-img"
              name="frame-img"
              className="hidden"
              onChange={(e: any) => setFile(e.target.files?.[0])}
            />
            <Label
              htmlFor="frame-img"
              className="w-[250px] h-[250px] mx-auto relative block rounded-md border-2 border-slate-100 cursor-pointer"
            >
              <Image src={img} alt="Demo" fill className="rounded-md" />
            </Label>
          </div>
        </div>
        <Button type="submit" size={"lg"}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FrameForm;

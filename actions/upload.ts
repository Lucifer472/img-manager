"use server";

import fs from "fs";
import { createImg, findImage } from "@/lib/img";

export const uploadImage = async (data: FormData, folder: string) => {
  const file: any = data.get("img");
  if (file === null) {
    return { error: "No File Found!" };
  }

  const filename = file.name;
  const filePath = "public/" + folder + "/" + filename;

  const isMatch = await findImage(filename);

  if (isMatch) return { error: "File Alredy Exists" };

  try {
    if (file instanceof Blob) {
      // Convert file to stream
      const stream = file.stream();

      const writeStream = fs.createWriteStream(filePath);
      for await (const chunk of stream as any) {
        writeStream.write(chunk);
      }
      writeStream.end();

      const img = await createImg(filename, "blogs");
      if (img.error) return { error: "Something Went Wrong!" };
      return { succes: "File Uploaded Succesfully" };
    }

    return { error: "Something Went Wrong!" };
  } catch (error) {
    return { error: "Something Went Wrong!" };
  }
};

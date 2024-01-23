"use server";

import fs from "fs";
import { fetchImages } from "./fetch";

export const uploadImage = async (data: any) => {
  const file: any = data.get("img");
  if (file === null) {
    return { error: "No File Found!" };
  }

  const filename = file.name;
  const filePath = "public/blogs/" + filename;

  const files = await fetchImages("public/blogs");

  const isMatch = files.includes(filename);

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
    }
    return { succes: "File Uploaded Succesfully" };
  } catch (error) {
    return { error: "Something Went Wrong!" };
  }
};

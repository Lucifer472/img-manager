import fs from "fs";

import { createImg, findImage } from "@/lib/img";
import { getWebsites } from "@/lib/websites";

export async function POST(req: Request) {
  const websites = await getWebsites();

  let corsHead;

  if (websites !== "http://localhost:3000") {
    const outputArray = websites.map((obj) => obj.websites).join(",");

    corsHead = {
      "Access-Control-Allow-Origin": outputArray,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  } else {
    corsHead = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  }

  try {
    const data = await req.formData();

    if (!data) {
      return new Response("Form Data Could not be Parsed!", {
        status: 500,
        headers: corsHead,
      });
    }

    const file: any = data.get("img");
    const folder: any = data.get("folder");
    if (!file) {
      return new Response("No Image Found!", {
        status: 404,
        headers: corsHead,
      });
    }

    const filename = file.name;
    const filePath = "public/" + folder + "/" + filename;

    const isMatch = await findImage(filename);

    if (isMatch)
      return new Response("File Alredy Exist", {
        status: 400,
        headers: corsHead,
      });

    if (file instanceof Blob) {
      // Convert file to stream
      const stream = file.stream();

      const writeStream = fs.createWriteStream(filePath);
      for await (const chunk of stream as any) {
        writeStream.write(chunk);
      }
      writeStream.end();

      const img = await createImg(filename, "blogs");
      if (img.error) {
        return new Response("Something Went Wrong!", {
          status: 400,
          headers: corsHead,
        });
      }
      return new Response("File Uploaded Succesfully", {
        status: 200,
        headers: corsHead,
      });
    }

    return new Response("Error", { status: 500, headers: corsHead });
  } catch (error) {
    return new Response("Error", { status: 500, headers: corsHead });
  }
}

import fs from "fs";

import { createImg, findImage } from "@/lib/img";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    if (!data) {
      return new Response("Form Data Could not be Parsed!", {
        status: 500,
      });
    }

    const file: any = data.get("img");
    const folder: any = data.get("folder");
    if (!file) {
      return new Response("No Image Found!", {
        status: 404,
      });
    }

    const timeM = new Date().getTime();
    const filename = timeM.toString() + file.name;
    const filePath = "public/" + folder + "/" + filename;

    const isMatch = await findImage(filename);

    if (isMatch) {
      return new Response("File Alredy Exist", {
        status: 400,
      });
    }

    if (file instanceof Blob) {
      // Convert file to stream
      const stream = file.stream();

      const writeStream = fs.createWriteStream(filePath);
      for await (const chunk of stream as any) {
        writeStream.write(chunk);
      }
      writeStream.end();

      const img = await createImg(filename, folder);
      if (img.error) {
        return new Response("Something Went Wrong!", {
          status: 400,
        });
      }
      return new Response(
        `https://img.missiongujarat.in/i/${folder}/${filename}`,
        {
          status: 200,
        }
      );
    }

    return new Response("File Upload Failed", { status: 500 });
  } catch (error) {
    return new Response(`Something Went Wrong`, { status: 500 });
  }
}

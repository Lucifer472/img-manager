import sharp from "sharp";
import fs from "fs";

export async function POST(request: Request) {
  const data = await request.json();

  const base64Image = data.img;

  // console.log(data.img);
  try {
    // Extract the base64 data part
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

    // Create a Buffer from the base64 data
    const buffer = Buffer.from(base64Data, "base64");

    // Use sharp to convert the image to PNG
    const pngBuffer = await sharp(buffer).toFormat("png").toBuffer();

    const filePath = `public/projects/${data.name}.png`;
    if (fs.existsSync(filePath)) {
      // Delete the existing file
      fs.unlinkSync(filePath);
    }
    // Write the PNG buffer to the file
    fs.writeFileSync(filePath, pngBuffer);
  } catch (error) {
    return new Response(`Error converting and saving image:, ${error}`, {
      status: 500,
    });
  }
  return new Response(
    `https://img.missiongujarat.in/i/projects/${data.name}.png`,
    {
      status: 200,
    }
  );
}

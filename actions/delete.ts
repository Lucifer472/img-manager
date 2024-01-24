"use server";

import path from "path";
import fs from "fs";
import { removeImg } from "@/lib/img";

export const deleteImage = async (
  id: number,
  folder: string,
  imgName: string
) => {
  try {
    const filePath = path.join(`public/${folder}/`, imgName);
    fs.unlinkSync(filePath);

    const isRemoved = await removeImg(id);
    if (isRemoved) return { success: "File Removed!" };
    return { errpr: "File Removed Failed" };
  } catch (error) {
    return { error: "Something Went Wrong!" };
  }
};

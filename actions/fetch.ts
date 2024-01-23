"use server";

import fs from "fs";

export const fetchImages = async (directoryPath: any) => {
  try {
    const files = await fs.readdirSync(directoryPath);
    return files;
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
};

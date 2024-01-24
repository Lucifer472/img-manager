import { db } from "@/lib/db";

export const createImg = async (name: string, folder: string) => {
  try {
    await db.img.create({
      data: {
        name,
        folder,
      },
    });

    return { success: "Record Added" };
  } catch (error) {
    return { error: "Error Occured!" };
  }
};

export const removeImg = async (id: number) => {
  try {
    await db.img.delete({
      where: {
        id,
      },
    });

    return true;
  } catch (error) {
    return null;
  }
};

export const readImages = async (folder: string, skip: number) => {
  try {
    const data = await db.img.findMany({
      skip: skip,
      take: 16,
      where: {
        folder,
      },
    });

    return data;
  } catch (error) {
    return null;
  }
};

export const findImage = async (filename: string) => {
  try {
    const data = await db.img.findUnique({
      where: {
        name: filename,
      },
    });
    return data;
  } catch (error) {
    return null;
  }
};

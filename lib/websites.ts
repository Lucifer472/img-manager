import { db } from "@/lib/db";

export const getWebsites = async () => {
  try {
    const data = await db.websites.findMany();
    if (data === null) return "http://localhost:3000";
    return data;
  } catch (error) {
    console.log(error);
    return "http://localhost:3000";
  }
};

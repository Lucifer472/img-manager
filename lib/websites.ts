import { db } from "./db";

export const getWebsites = async () => {
  try {
    const data = db.websites.findMany();
    if (data === null) return "http://localhost:3000";

    return data;
  } catch (error) {
    return "http://localhost:3000";
  }
};

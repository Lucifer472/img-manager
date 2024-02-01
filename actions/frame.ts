"use server";

import * as z from "zod";
import mysql from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";

import { frameSchema } from "@/schema";

export const createFrames = async (v: z.infer<typeof frameSchema>) => {
  const validateFields = frameSchema.safeParse(v);
  if (!validateFields.success) {
    console.log("ERROR");
    return { error: "Invalid Fields" };
  }

  const id = uuidv4();

  const connection = await mysql.createConnection({
    host: "main-db-do-user-15091144-0.c.db.ondigitalocean.com",
    port: 25060,
    user: "doadmin",
    password: "AVNS__XXtZCugy3HFpWEWp7o",
    database: "frames",
  });

  try {
    // Connect to the database
    await connection.connect();

    // Perform your database query
    const results = await connection.query(
      `INSERT INTO frames.Frames (id, img, name, "desc", supporter, userId) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, v.img, v.name, v.desc, 0, "clryj1bly000009l52u1kgneg"]
    );

    // console.log("The solution is: ", results);

    // Close the connection
    await connection.end();

    return { success: "Frame Created Successfully" };
  } catch (error: any) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

"use server";

import * as z from "zod";
import mysql from "mysql";
import { v4 as uuidv4 } from "uuid";

import { frameSchema } from "@/schema";

const connection = mysql.createConnection({
  host: "main-db-do-user-15091144-0.c.db.ondigitalocean.com:25060",
  user: "doadmin",
  password: "AVNS__XXtZCugy3HFpWEWp7o",
  database: "frames",
});

export const createFrames = async (v: z.infer<typeof frameSchema>) => {
  const validateFields = frameSchema.safeParse(v);
  if (!validateFields.success) {
    console.log("ERROR");
    return { error: "Invalid Fields" };
  }

  const id = uuidv4();

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to database:", err.message);
      return { error: "Something went Wrong!" };
    }
    try {
      // You can perform your database queries here
      // Example query
      connection.query(
        ` INSERT INTO 'Frames' ('id', 'img', 'name', 'desc', 'supporter', 'userId') VALUES ('${id}', '${v.img}', '${v.name}', '${v.desc}', '0', 'clryj1bly000009l52u1kgneg');`,
        (queryErr, results) => {
          if (queryErr) throw queryErr;

          console.log("The solution is: ", results[0].solution);

          // Close the connection when done with queries
          connection.end();
        }
      );
      return { success: "Frame Created Succesfully" };
    } catch (error) {
      return { error: "Something went Wrong!" };
    }
  });
};

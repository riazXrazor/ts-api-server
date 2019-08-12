import { Connection, createConnection } from "typeorm";

export let connection: Connection;

export const initializeDbConnection = async () => {
  if (connection) {
    return connection;
  }
  console.log("connection", connection);

  connection = await createConnection();
};

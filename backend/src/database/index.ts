import { Client } from "pg";

const db = new Client({
	host: "localhost",
	port: 5432,
	database: "postgres",
	password: "1234",
	user: "postgres",
});

export default db;

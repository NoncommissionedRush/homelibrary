import pg from "pg";
const { Pool } = pg;
import "dotenv/config";

// db access
const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: "homelibrary",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// cookie config
export const sessionConfig = {
  name: "qid",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  },
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  resave: false,
};

export default pool;

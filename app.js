import express from "express";
import router from "./server/routes/router.js";
import session from "express-session";
import { sessionConfig } from "./config.js";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(session(sessionConfig));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

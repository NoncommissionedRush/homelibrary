import express from "express";
import router from "./routes/router.js";
import session from "express-session";
import { sessionConfig } from "./config.js";
import "dotenv/config";
import * as path from "path";

const PORT = process.env.PORT || 5000;

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.use(session(sessionConfig));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

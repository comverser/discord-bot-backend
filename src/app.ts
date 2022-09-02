import path from "path";
import express from "express";

import { config } from "./config/config";
import roleRoutes from "./routes/roleRoutes";

const app = express();

/* middleware */
// app.use(express.static("public"));
app.use(express.json());

/* view engine */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/role", roleRoutes);

app.listen(config.server.port, () => {
    console.log(`Server is running on port ${config.server.port}`);
});

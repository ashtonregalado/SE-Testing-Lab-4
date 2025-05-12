import express from "express";
import cors from "cors";
import getRoutes from "./routes/get-routes";
import postRoutes from "./routes/post-routes";
import patchRoutes from "./routes/put-routes";
import deleteRoutes from "./routes/delete-routes";
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/get", getRoutes);
app.use("/post", postRoutes);
app.use("/patch", patchRoutes);
app.use("/delete", deleteRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

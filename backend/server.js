import express from "express";
import productRoutes from "./routes/productRoutes.js";
import { connectDb } from "./config/config.js";
import bodyParser from "body-parser";
import cors from "cors";
import { globalErrorHandling } from "./middlewares/globalErrorHandling.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 8080;

connectDb();

app.use(bodyParser.json({ limit: "50mb" }));
// app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:5173" })); //if you solved cors error by installing the package and  still getting cors then write this statement

app.use(cookieParser());
app.use("/static", express.static("public")); //serve static files in express
app.use("/api", productRoutes, authRoutes, categoryRoutes, paymentRoutes);

app.use(globalErrorHandling);
app.listen(port, () => {
  console.log(`Server is Listening at Port ${port}`);
});

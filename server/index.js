import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";
import accountRoutes from "./src/routes/account.js";
import tagRoutes from "./src/routes/tag.js";
import tradeRoutes from "./src/routes/trade.js";
import dotenv from "dotenv";
import helmet from "helmet";
import { ErrorHandler } from "./src/middleware/catchError.js";
import corsOptions from "./src/config/corsOptions.js";
import credentials from "./src/config/corsCredentials.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

// #region CONFIGURATIONS
dotenv.config();
const app = express();
const PORT = process.env.PORT || 6000;
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(credentials);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Hello World!');
})
//#endregion

/* Routes */
app.use("/", authRoutes);
app.use("/", accountRoutes);
app.use("/", tagRoutes);
app.use("/", tradeRoutes);

//#region MONGOOSE SETUP
mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));
//#endregion

//#region Error Handling
app.use(ErrorHandler);
//#endregion